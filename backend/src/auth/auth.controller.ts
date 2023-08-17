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

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
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
            return new ConflictException('User already exists.');
        }

        return new UserDto(
            await this.userService.createUser(
                signUpDto.name,
                signUpDto.email,
                signUpDto.password,
            ),
        );
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
