import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IAuthRepository } from '../../repositories/auth.repository';

export class SignInUseCase implements IBaseUseCase<UserEntity> {
  constructor(private repo: IAuthRepository) {}

  execute(email: string): Promise<UserEntity> {
    return this.repo.signIn(email);
  }
}
