import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IAuthRepository } from '../../repositories/auth.repository';

export class ForgetPasswordUseCase implements IBaseUseCase<string> {
  constructor(private repo: IAuthRepository) {}

  execute(email: string): Promise<string> {
    return this.repo.forgetPassword(email);
  }
}
