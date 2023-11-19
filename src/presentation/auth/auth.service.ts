import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { SignInUseCase } from '../../domain/usecases/auth/signin_usecase';
import { SignUpUseCase } from '../../domain/usecases/auth/signup_usecase';
import { ForgetPasswordUseCase } from '../../domain/usecases/auth/forget_password_usecase';
import { VerifyPassResetCodeUseCase } from '../../domain/usecases/auth/verify_pass_reset_code';
import { ResetPasswordUseCase } from '../../domain/usecases/auth/reset_password';
import { JwtService } from '@nestjs/jwt';
import {
  passwordCompare,
  passwordHash,
} from '../../application/core/utilities/password_hash';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUsseCase: SignUpUseCase,
    private forgetPasswordUseCase: ForgetPasswordUseCase,
    private verifyPassResetCodeUsecase: VerifyPassResetCodeUseCase,
    private resetPasswordUsecase: ResetPasswordUseCase,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signInUserService(
    email: string,
    password: string,
  ): Promise<[UserEntity, string]> {
    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }

    const user = await this.signInUseCase.execute(email);

    if (!user) {
      throw new BadRequestException('Email not exist');
    }

    const pass = await passwordCompare(password, user.password);

    if (!pass) {
      throw new BadRequestException('password not found');
    }

    const payload = { id: user.id, email: user.email, role: user.roles };
    const token = await this.jwtService.signAsync(payload);

    return [user, token];
  }

  async signUpService(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new BadRequestException('name and email , password are required');
    }

    const pass = await passwordHash(password);

    return this.signUpUsseCase.execute(name, email, pass);
  }

  async registerByGoogleService(
    name: string,
    email: string,
    password: string,
  ): Promise<[UserEntity, string]> {
    const user = await this.userService.getOneUserService(
      {
        params: { email: email },
      },
      false,
    );

    if (!user) {
      const pass = await passwordHash(password);

      const userEntity = new UserEntity({
        name: name,
        email: email,
        password: pass,
      });

      const createUser = await this.userService.createUserService(userEntity);

      const payload = {
        id: createUser.id,
        email: createUser.email,
        role: createUser.roles,
      };
      const token = await this.jwtService.signAsync(payload);
      return [createUser, token];
    } else {
      const [user, token] = await this.signInUserService(email, password);
      return [user, token];
    }
  }

  forgetPasswordService(email: string) {
    if (!email) {
      throw new BadRequestException('email is required');
    }
    return this.forgetPasswordUseCase.execute(email);
  }

  verifyPassResetCodeService(resetCode: string) {
    if (!resetCode) {
      throw new BadRequestException('resetCode is required');
    }

    return this.verifyPassResetCodeUsecase.execute(resetCode);
  }

  async resetPasswordService(
    email: string,
    password: string,
  ): Promise<[UserEntity, string]> {
    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }

    const user = await this.resetPasswordUsecase.execute(email, password);

    const payload = { id: user.id, email: user.email, role: user.roles };
    const token = await this.jwtService.signAsync(payload);

    return [user, token];
  }
}
