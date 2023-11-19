import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

export class GetUserByIdUseCase implements IBaseUseCase<UserEntity> {
  constructor(private userRepository: IUserRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<UserEntity> {
    return this.userRepository.findById(option);
  }
}
