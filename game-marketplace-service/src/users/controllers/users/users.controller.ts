import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  Res,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto, UserCredentialsDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // GET METHODS
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Get('id/:id')
  async findUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findUsersById(id);
  }

  // POST METHODS

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUsers(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async loginUser(@Body() userCredentials: UserCredentialsDto) {
    const res = await this.userService.validateUser(userCredentials);
    if (res) {
      return res;
    }
    return;
  }

  // POST METHODS

  @Put('updateBalance/:id')
  @ApiQuery({ name: 'balance', required: true })
  @UsePipes(ValidationPipe)
  async updateBalance(
    @Param('id', ParseIntPipe) id: number,
    @Query('balance', ParseIntPipe) balance: number,
  ) {
    // WE SHOULD CHECK IF THE USER HAS ENOUGH BALANCE TO SUBSTRACT BEFORE THIS

    return this.userService.updateUserBalance(id, balance);
  }
}
