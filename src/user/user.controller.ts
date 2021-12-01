import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: { name: string }): Promise<User> {
    return this.userService.createUser(body.name);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('/:userId')
  getById(@Param('userId', new ParseIntPipe()) userId: number): Promise<User> {
    return this.userService.getOneById(userId);
  }

  @Put('/:userId')
  updateById(
    @Param('userId', new ParseIntPipe()) userId: number,
    @Body() body: { name: string },
  ): Promise<User> {
    return this.userService.updateUser(userId, body.name);
  }

  @Delete('/:userId')
  deleteById(
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<User> {
    return this.userService.deleteUser(userId);
  }
}
