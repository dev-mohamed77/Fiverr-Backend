import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

export class GetUserByIdUseCase implements IBaseUseCase<UserEntity> {
  constructor(private userRepository: IUserRepository) {}

  execute(
    id: string,
    relation?: FindOptionsRelations<UserEntity>,
  ): Promise<UserEntity> {
    return this.userRepository.findById(id, relation);
  }
}
