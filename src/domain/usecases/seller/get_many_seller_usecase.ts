import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

export class GetManyUserUseCase implements IBaseUseCase<UserEntity[]> {
  constructor(private userRepository: IUserRepository) {}

  execute(
    filter: Partial<UserEntity>,
    pagination: PaginationModel,
    relation: FindOptionsRelations<UserEntity>,
  ): Promise<UserEntity[]> {
    return this.userRepository.findMany(filter, pagination, relation);
  }
}
