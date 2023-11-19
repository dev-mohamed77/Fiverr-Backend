import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { EndPoint } from '../../application/config/enum/endpoint';
import { ChangePasswordLoggedUserDto } from '../../domain/dtos/user/change_password_logged_user.dto';
import { UpdateLoggedUserDataDto } from 'src/domain/dtos/user/update_logged_user_data.dto';
import { Roles } from '../auth/role.decorator';
import { Role } from '../../application/config/enum/roles';
import { RoleGuard } from '../auth/role.guard';
import { UserEntity } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../domain/dtos/user/create_user_dto';
import { UpdateUserDto } from 'src/domain/dtos/user/update_user_dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller(EndPoint.userPrefix)
export class UserController {
  constructor(private userService: UserService) {}

  // -------------------------------- Logged User ------------------------

  @UseGuards(JwtAuthGuard)
  @Get(EndPoint.getMe)
  async getMeController(@Req() req) {
    const result = req.user;

    return {
      status: true,
      result: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(EndPoint.changePasswordLoggedUser)
  async changePasswordLoggedUserController(
    @Req() req,
    @Body() changePassword: ChangePasswordLoggedUserDto,
  ) {
    const [result, token] =
      await this.userService.changePasswordLoggedUserService(
        req.user.id,
        changePassword.currentPassword,
        changePassword.newPassword,
      );

    return {
      status: true,
      result,
      token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(EndPoint.updateLoggedUser)
  async updateLoggedUserDataController(
    @Req() req,
    @Body() updateLoggedUserData: UpdateLoggedUserDataDto,
  ) {
    const result = await this.userService.updateLoggedUserDataService(
      req.user.id,
      updateLoggedUserData,
    );

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(EndPoint.deleteLoggedUser)
  async deleteLoggedUserController(@Req() req) {
    const result = await this.userService.deleteLoggedUserService(req.user.id);

    if (!result) {
      throw new BadRequestException(`seller ${req.user.id} is not exist`);
    }

    return {
      status: true,
      result: 'seller deleted successfully',
    };
  }

  // -------------------------------- Admin API --------------------------------

  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async createUserController(@Body() createUserDto: CreateUserDto) {
    const user = new UserEntity({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    const result = await this.userService.createUserService(user);

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(EndPoint.id)
  async getUserByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.userService.getUserByIdService({
      id,
      relation: {
        seller: true,
      },
      select: {
        seller: {
          id: true,
          fullName: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(`User ${id} is not exist`);
    }

    return {
      status: true,
      result,
    };
  }

  // @Roles(Role.admin, Role.user)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async getUsersController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.userService.getUsersService({
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
    });

    return {
      status: true,
      length: length,
      result: result,
    };
  }

  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(EndPoint.id)
  async updateUserByIdController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = new UserEntity({
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: updateUserDto.password,
      gender: updateUserDto.gender,
      roles: updateUserDto.roles,
      phone: updateUserDto.phone,
      age: updateUserDto.age,
      country: updateUserDto.country,
    });

    const result = await this.userService.updateUserService({
      id,
      params: user,
    });

    return {
      status: true,
      result,
    };
  }

  // @Roles(Role.admin, Role.user)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(EndPoint.id)
  async deleteUserByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.userService.deleteLoggedUserService(id);

    if (!result) {
      throw new BadRequestException(`seller ${id} is not exist`);
    }

    return {
      status: true,
      result: 'user deleted successfully',
    };
  }
}
