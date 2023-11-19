import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

export class GetOneUserUseCase implements IBaseUseCase<UserEntity> {
  constructor(private userRepository: IUserRepository) {}

  execute(
    filter: Partial<UserEntity>,
    relation?: FindOptionsRelations<UserEntity>,
  ): Promise<UserEntity> {
    return this.userRepository.findOne(filter, relation);
  }
}
