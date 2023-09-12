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
    ParseUUIDPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { SignUpDto } from './dto/signUp.dto';
import { UsersService } from 'src/users/users.service';
import { Request as ExpressRequest } from 'express';
import { SessionDto } from './dto/session.dto';
import { UserTokenDto } from './dto/userToken.dto';
import { ResetPasswordRequestDto } from './dto/resetPasswordRequest.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { NewPasswordDto } from './dto/newPassword.dto';
import { SignInDto } from './dto/signIn.dto';
import * as config from 'config';
import { SignInSuccessDto } from './dto/signInSuccess.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: SignInSuccessDto })
    @Post('login')
    async signIn(
        @Body() signInDto: SignInDto,
        @Request() request: ExpressRequest,
    ): Promise<UserTokenDto> {
        return await this.authService.signIn(
            signInDto.email,
            signInDto.password,
            request.headers['user-agent'] || '',
            signInDto.permanent,
        );
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async signOut(@Request() request: any) {
        await this.authService.invalidateSession(request.session.id);
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: UserTokenDto })
    @Get('token')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getNewToken(@Request() request: any): Promise<UserTokenDto> {
        return await this.authService.createNewToken(
            request.user,
            request.session,
        );
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: UserTokenDto })
    @Get('refresh')
    async refreshToken(
        @Request() request: any,
        @Query('token') token: string,
        @Query('session_id') sessionId: string,
    ): Promise<UserTokenDto> {
        if (!token || !sessionId) throw new BadRequestException();

        const session = await this.authService.verifyRefreshToken(
            sessionId,
            token,
        );
        const user = await this.userService.findById(session.userId);
        if (!user) throw new NotFoundException('User not found');

        return await this.authService.createNewToken(user, session);
    }

    @ApiOkResponse({ type: UserDto })
    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        const userCount = await this.userService.getUserCount();
        if (userCount !== 0 && config.get<boolean>('disable_registration')) {
            throw new BadRequestException('Registration is disabled.');
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
        const user = await this.userService.findByEmail(body.email);
        if (!user) {
            throw new NotFoundException('User not found.');
        }

        const resetRequest =
            await this.userService.createPasswordResetRequest(user);

        return new ResetPasswordDto({
            ...resetRequest.request,
            token: resetRequest.token,
        });
    }

    @ApiOkResponse()
    @Post('reset')
    async resetPassword(@Body() body: NewPasswordDto) {
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

    @Get('verify')
    @ApiOkResponse()
    @ApiQuery({
        name: 'user_id',
        type: String,
        required: true,
    })
    @ApiQuery({
        name: 'key',
        type: String,
        required: true,
    })
    @ApiQuery({
        name: 'id',
        type: String,
        required: true,
    })
    async verify(
        @Query('user_id', new ParseUUIDPipe()) userId: string,
        @Query('key') key: string,
        @Query('id', new ParseUUIDPipe()) id: string,
    ) {
        if (!userId || !key || !id) throw new BadRequestException();

        const user = await this.userService.findById(userId);
        if (!user) throw new NotFoundException('User not found');
        if (user.activated)
            throw new BadRequestException('User already activated');

        const ok = await this.userService.validateVerification(id, userId, key);

        if (!ok) throw new UnauthorizedException();

        return { status: 'ok' };
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiOkResponse({ type: UserDto })
    @ApiBearerAuth()
    getProfile(@Request() req: any) {
        return new UserDto(req.user);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('session')
    @ApiOkResponse({ type: SessionDto })
    getSession(@Request() req: any) {
        return new SessionDto(req.session);
    }
}
