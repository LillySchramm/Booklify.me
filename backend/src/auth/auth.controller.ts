import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
    Request,
    Get,
    BadRequestException,
    ConflictException,
    Query,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { SignUpDto } from './dto/signUp.dto';
import { emailRegex, passwordRegex, userNameRegex } from './constants';
import { UsersService } from 'src/users/users.service';
import { Request as ExpressRequest } from 'express';
import { SessionDto } from './dto/session.dto';
import { UserTokenDto } from './dto/userToken.dto';
import { ResetPasswordRequestDto } from './dto/resetPasswordRequest.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { NewPasswordDto } from './dto/newPassword.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body() signInDto: SignUpDto,
        @Request() request: ExpressRequest,
    ): Promise<UserTokenDto> {
        return await this.authService.signIn(
            signInDto.email,
            signInDto.password,
            request.headers['user-agent'] || '',
        );
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    @UseGuards(AuthGuard)
    async signOut(@Request() request: any) {
        await this.authService.invalidateSession(request.session.id);
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: UserTokenDto })
    @Get('token')
    @UseGuards(AuthGuard)
    async getNewToken(@Request() request: any): Promise<UserTokenDto> {
        return await this.authService.createNewToken(
            request.user,
            request.session,
        );
    }

    @ApiOkResponse({ type: UserDto })
    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        if (
            !signUpDto ||
            !signUpDto.name ||
            !signUpDto.email ||
            !signUpDto.password
        )
            throw new BadRequestException();

        if (!userNameRegex.test(signUpDto.name)) {
            throw new BadRequestException('User name bad formatted');
        }

        if (!emailRegex.test(signUpDto.email)) {
            throw new BadRequestException('EMail bad formatted');
        }

        if (!passwordRegex.test(signUpDto.password)) {
            throw new BadRequestException('Password bad formatted');
        }

        const doesAlreadyExist = await this.userService.doesAlreadyExist(
            signUpDto.email,
            signUpDto.name,
        );
        if (doesAlreadyExist) {
            throw new ConflictException('User already exists.');
        }

        return new UserDto(
            await this.userService.createUser(
                signUpDto.name,
                signUpDto.email,
                signUpDto.password,
            ),
        );
    }

    @ApiOkResponse({ type: ResetPasswordDto })
    @Post('request-reset')
    async requestResetPassword(@Body() body: ResetPasswordRequestDto) {
        if (!body || !body.email) throw new BadRequestException();

        if (!emailRegex.test(body.email)) {
            throw new BadRequestException('EMail bad formatted');
        }

        const user = await this.userService.findByEmail(body.email);
        if (!user) {
            return new NotFoundException('User not found.');
        }

        const resetRequest = await this.userService.createPasswordResetRequest(
            user,
        );

        return new ResetPasswordDto({
            ...resetRequest.request,
            token: resetRequest.token,
        });
    }

    @ApiOkResponse()
    @Post('reset')
    async resetPassword(@Body() body: NewPasswordDto) {
        if (
            !body ||
            !body.userId ||
            !body.newPassword ||
            !body.resetId ||
            !body.resetToken
        )
            throw new BadRequestException();

        if (!passwordRegex.test(body.newPassword)) {
            throw new BadRequestException('Password bad formatted');
        }

        const user = await this.userService.findById(body.userId);
        if (!user) {
            return new NotFoundException('User not found.');
        }

        const ok = await this.userService.resetPassword(
            user.id,
            body.resetToken,
            body.resetId,
            body.newPassword,
        );
        if (!ok) throw new UnauthorizedException();
    }

    @ApiOkResponse()
    @Post('resend')
    async resend(@Query('user_id') userId: string) {
        if (!userId) throw new BadRequestException();

        const user = await this.userService.findById(userId);
        if (!user) throw new NotFoundException('User not found');
        if (user.activated)
            throw new BadRequestException('User already activated');

        await this.userService.createUserVerification(user);
    }

    @ApiOkResponse()
    @Get('verify')
    async verify(@Query() query: any) {
        if (!query.user_id || !query.key || !query.id)
            throw new BadRequestException();

        const user = await this.userService.findById(query.user_id);
        if (!user) throw new NotFoundException('User not found');
        if (user.activated)
            throw new BadRequestException('User already activated');

        const ok = await this.userService.validateVerification(
            query.id,
            query.user_id,
            query.key,
        );

        if (!ok) throw new UnauthorizedException();

        return { status: 'ok' };
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiOkResponse({ type: UserDto })
    getProfile(@Request() req: any) {
        return new UserDto(req.user);
    }

    @UseGuards(AuthGuard)
    @Get('session')
    @ApiOkResponse({ type: SessionDto })
    getSession(@Request() req: any) {
        return new SessionDto(req.session);
    }
}
