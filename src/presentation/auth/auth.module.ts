import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepositoryImp } from '../../infra/repositories/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../infra/models/user.model';
import { SignInUseCase } from '../../domain/usecases/auth/signin_usecase';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { SignUpUseCase } from '../../domain/usecases/auth/signup_usecase';
import { ForgetPasswordUseCase } from '../../domain/usecases/auth/forget_password_usecase';
import { VerifyPassResetCodeUseCase } from '../../domain/usecases/auth/verify_pass_reset_code';
import { ResetPasswordUseCase } from '../../domain/usecases/auth/reset_password';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './role.guard';
import { UserModule } from '../user/user.module';

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
    UserModule,
  ],
  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
    RoleGuard,

    {
      provide: AuthRepositoryImp,
      useClass: AuthRepositoryImp,
    },
    {
      provide: SignInUseCase,
      useFactory: (authRepo: IAuthRepository) => {
        return new SignInUseCase(authRepo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: SignUpUseCase,
      useFactory: (authRepo: IAuthRepository) => {
        return new SignUpUseCase(authRepo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: ForgetPasswordUseCase,
      useFactory: (authRepo: IAuthRepository) => {
        return new ForgetPasswordUseCase(authRepo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: VerifyPassResetCodeUseCase,
      useFactory: (authRepo: IAuthRepository) => {
        return new VerifyPassResetCodeUseCase(authRepo);
      },
      inject: [AuthRepositoryImp],
    },
    {
      provide: ResetPasswordUseCase,
      useFactory: (authRepo: IAuthRepository) => {
        return new ResetPasswordUseCase(authRepo);
      },
      inject: [AuthRepositoryImp],
    },
  ],
})
export class AuthModule {}
