import { updateOptionBase } from 'src/application/core/model/option_base_model';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';

export class UpdateUserUseCase implements IBaseUseCase<UserEntity> {
  constructor(private userRepository: IUserRepository) {}

  execute(option: updateOptionBase<UserEntity>): Promise<UserEntity> {
    return this.userRepository.update(option);
  }
}
