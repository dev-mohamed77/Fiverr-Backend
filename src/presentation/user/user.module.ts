import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryImp } from '../../infra/repositories/user_repository';
import { CreateUserUseCase } from '../../domain/usecases/user/create_user_usecase';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { GetUserByIdUseCase } from '../../domain/usecases/user/get_user_by_id_usecase';
import { GetUsersUseCase } from '../../domain/usecases/user/get_users_usecase';
import { UpdateUserUseCase } from '../../domain/usecases/user/update_user_usecase';
import { DeleteUserUseCase } from '../../domain/usecases/user/delete_user_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../infra/models/user.model';
import { GetManyUserUseCase } from '../../domain/usecases/user/get_user_many_usecase';
import { GetOneUserUseCase } from '../../domain/usecases/user/get_one_user_usecase';
import { DeleteOneUserUseCase } from '../../domain/usecases/user/delete_one_user_usecase';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '3d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [
    UserService,
    {
      provide: UserRepositoryImp,
      useClass: UserRepositoryImp,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new CreateUserUseCase(userRepo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetManyUserUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new GetManyUserUseCase(userRepo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new GetUserByIdUseCase(userRepo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetUsersUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new GetUsersUseCase(userRepo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: GetOneUserUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new GetOneUserUseCase(userRepo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new UpdateUserUseCase(userRepo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new DeleteUserUseCase(userRepo);
      },
      inject: [UserRepositoryImp],
    },
    {
      provide: DeleteOneUserUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new DeleteOneUserUseCase(userRepo);
      },
      inject: [UserRepositoryImp],
    },
  ],
})
export class UserModule {}
