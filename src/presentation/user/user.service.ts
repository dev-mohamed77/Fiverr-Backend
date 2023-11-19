import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../../domain/usecases/user/create_user_usecase';
import { GetUsersUseCase } from '../../domain/usecases/user/get_users_usecase';
import { GetUserByIdUseCase } from '../../domain/usecases/user/get_user_by_id_usecase';
import { UpdateUserUseCase } from '../../domain/usecases/user/update_user_usecase';
import { DeleteUserUseCase } from 'src/domain/usecases/user/delete_user_usecase';
import { UserEntity } from '../../domain/entities/user.entity';
import { PaginationModel } from '../../application/core/model/pagination_model';
import { GetManyUserUseCase } from '../../domain/usecases/user/get_user_many_usecase';
import { GetOneUserUseCase } from '../../domain/usecases/user/get_one_user_usecase';
import { DeleteOneUserUseCase } from '../../domain/usecases/user/delete_one_user_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import {
  passwordCompare,
  passwordHash,
} from '../../application/core/utilities/password_hash';
import { JwtService } from '@nestjs/jwt';
import { UpdateLoggedUserData } from '../../application/core/model/update_logged_user_data.model';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';

@Injectable()
export class UserService {
  constructor(
    private createUserUsecase: CreateUserUseCase,
    private getUsersUsecase: GetUsersUseCase,
    private getManyUsersUsecase: GetManyUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private getOneUserUseCase: GetOneUserUseCase,
    private updateUserUsecase: UpdateUserUseCase,
    private deleteUserUsecase: DeleteUserUseCase,
    private deleteOneUserUsecase: DeleteOneUserUseCase,
    private jwtService: JwtService,
  ) {}

  createUserService(param: UserEntity): Promise<UserEntity> {
    return this.createUserUsecase.execute(param);
  }

  getUsersService(option: FindAllOptionTypOrmModel<UserEntity>) {
    return this.getUsersUsecase.execute(option);
  }

  getManyUsersService(option: FindAllOptionTypOrmModel<UserEntity>) {
    return this.getManyUsersUsecase.execute(option);
  }

  async getUserByIdService(option: FindOneByIDOptionTypeOrmModel<UserEntity>) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.getUserByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`User ${option.id} is not exist`);
    }

    return result;
  }

  async getOneUserService(
    option: FindOneOptionTypeOrmModel<UserEntity>,
    isConditionUser = true,
  ) {
    const result = await this.getOneUserUseCase.execute(option);

    if (isConditionUser) {
      if (!result) {
        throw new BadRequestException(`User is not exist`);
      }

      return result;
    }

    return result;
  }

  async updateUserService(option: UpdateOptionTypeOrmModel<UserEntity>) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.updateUserUsecase.execute(option);

    if (!result) {
      throw new BadRequestException(`User ${option.id} is not exist`);
    }

    return result;
  }

  async deleteUserService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.deleteUserUsecase.execute(id);

    if (!result) {
      throw new BadRequestException(`User ${id} is not exist`);
    }

    return result;
  }

  async deleteOneUserService(filter: Partial<UserEntity>) {
    const result = await this.deleteOneUserUsecase.execute(filter);

    if (!result) {
      throw new BadRequestException(`User is not exist`);
    }

    return result;
  }

  //------------------------------ Logged User ---------------------------

  async changePasswordLoggedUserService(
    id: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<[UserEntity, string]> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    if (!currentPassword || !newPassword) {
      throw new BadRequestException(
        'newPassword, currentPassword are required',
      );
    }

    const user = await this.getUserByIdService({ id });

    if (!user) {
      throw new BadRequestException('user is not exist');
    }

    const comparePass = await passwordCompare(currentPassword, user.password);

    if (!comparePass) {
      throw new BadRequestException('The current password is incorrect');
    }

    const hashPassword = await passwordHash(newPassword);

    const userEntity = new UserEntity({
      password: hashPassword,
      passwordChangedAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });

    const updateUser = await this.updateUserService({
      id: user.id,
      params: userEntity,
    });

    const payload = {
      id: updateUser.id,
      email: updateUser.email,
      role: updateUser.roles,
    };

    const token = await this.jwtService.signAsync(payload);

    return [updateUser, token];
  }

  async updateLoggedUserDataService(
    id: string,
    data: UpdateLoggedUserData,
  ): Promise<UserEntity> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    const userEntity = new UserEntity({
      name: data.name,
      gender: data.gender,
      phone: data.phone,
      age: data.age,
      country: data.country,
      updatedAt: new Date(Date.now()),
    });

    const updateUser = await this.updateUserService({
      id: id,
      params: userEntity,
    });

    return updateUser;
  }

  async deleteLoggedUserService(id: string): Promise<boolean> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    return this.deleteUserService(id);
  }
}
