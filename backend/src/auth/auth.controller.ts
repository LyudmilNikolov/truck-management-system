import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import {
  LoginResponseType,
  UserResponseType,
} from 'src/users/types/userResponse.type';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // curl -X GET http://localhost:3000/auth/profile -H "Authorization: <your_token_here>"
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile() {
    return 'Access successfully logged in ';
  }

  // curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}'
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    const user = await this.authService.register(createUserDto);
    return this.authService.buildUserResponse(user);
  }

  // curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}'
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseType> {
    const user = await this.authService.login(loginDto);
    return user;
  }
}
