import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IAuthRepository } from '../../repositories/auth.repository';

export class ResetPasswordUseCase implements IBaseUseCase<UserEntity> {
  constructor(private repo: IAuthRepository) {}

  execute(email: string, password: string): Promise<UserEntity> {
    return this.repo.resetPassword(email, password);
  }
}
