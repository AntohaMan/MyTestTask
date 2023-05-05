import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthTokenDto } from './dto/auth-token.dto';
import { User } from '../user/user.model';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: 200, type: AuthTokenDto })
  @ApiBody({ type: AuthTokenDto })
  @Post('/login')
  login(@Body() userDto: CreateUserDto): Promise<AuthTokenDto> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'registration' })
  @ApiResponse({ status: 200, type: AuthTokenDto })
  @ApiBody({ type: String })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.registration(userDto);
  }
}
