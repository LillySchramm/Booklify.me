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

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignUpDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
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
}
