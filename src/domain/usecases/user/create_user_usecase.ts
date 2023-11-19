import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';

export class CreateUserUseCase implements IBaseUseCase<UserEntity> {
  constructor(private userRepository: IUserRepository) {}

  execute(params: UserEntity): Promise<UserEntity> {
    return this.userRepository.create(params);
  }
}
