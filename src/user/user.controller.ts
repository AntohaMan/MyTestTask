import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { MessageResponse, UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../types/request.interface';
import { strict } from 'assert';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Generate pdf file' })
  @ApiResponse({ status: 200, type: String })
  @UseGuards(JwtAuthGuard)
  @Post('pdf')
  generatePdf(@Body() { email }: { email: string }) {
    return this.userService.createPdf(email);
  }

  @ApiOperation({ summary: 'Add image' })
  @ApiResponse({ status: 200, type: String })
  @ApiBody({ type: CreateUserDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put('add/image')
  addImage(@Req() req: RequestWithUser, @UploadedFile() image: any) {
    return this.userService.addImage(req.userId, image);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({ status: 200, type: void {} })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() body: any, @Req() req: any) {
    return this.userService.updateUser(body, req.userId);
  }

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: MessageResponse })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
