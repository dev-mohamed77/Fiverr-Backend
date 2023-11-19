import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

export class GetUsersUseCase implements IBaseUseCase<[UserEntity[], number]> {
  constructor(private userRepository: IUserRepository) {}

  execute(
    pagination: PaginationModel,
    relation?: FindOptionsRelations<UserEntity>,
  ): Promise<[UserEntity[], number]> {
    return this.userRepository.findAll(pagination, relation);
  }
}
