import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IUserRepository } from '../../repositories/user.repository';
import { UserEntity } from '../../entities/user.entity';

export class DeleteOneUserUseCase implements IBaseUseCase<boolean> {
  constructor(private userRepository: IUserRepository) {}

  execute(filter: Partial<UserEntity>): Promise<boolean> {
    return this.userRepository.deleteOne(filter);
  }
}
