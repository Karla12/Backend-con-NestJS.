import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dtos/users.dtos';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Get()
  getUsers(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }
}
