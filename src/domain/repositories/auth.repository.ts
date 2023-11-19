import { UserEntity } from '../entities/user.entity';

export abstract class IAuthRepository {
  abstract signIn(email: string): Promise<UserEntity>;

  abstract signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity>;

  abstract forgetPassword(email: string): Promise<string>;

  abstract verifyPassResetCode(resetCode: string): Promise<UserEntity>;

  abstract resetPassword(email: string, password: string): Promise<UserEntity>;
}
