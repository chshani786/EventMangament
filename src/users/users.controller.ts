import { Controller, Post, HttpStatus, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseDto } from '../global/responseDTO';
import { UserDto } from './dto/user.dto';
import { BypassAuth } from '../decorators/bypass.auth.decorator';
import { UserDecorator } from '../decorators/user.decorator';
import { User } from '../models/user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @BypassAuth()
  @Post()
  async create(@Body() userDto: UserDto): Promise<ResponseDto<any>> {
    const resp = await this.usersService.create(userDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User has been created',
      data: resp,
    };
  }

  @Get()
  async findOne(@UserDecorator() user): Promise<ResponseDto<User>> {
    const resp = await this.usersService.findOne(user.uid);
    return new ResponseDto(HttpStatus.OK, 'User Found!', resp);
  }
}
