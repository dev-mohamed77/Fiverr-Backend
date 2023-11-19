import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetManyUserUseCase
  implements IBaseUseCase<[UserEntity[], number]>
{
  constructor(private userRepository: IUserRepository) {}

  execute(option: FindAllOptionBase): Promise<[UserEntity[], number]> {
    return this.userRepository.findMany(option);
  }
}
