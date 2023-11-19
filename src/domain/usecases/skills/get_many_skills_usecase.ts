import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { IOccupationRepository } from '../../repositories/occupation.repository';
import { OccupationEntity } from '../../entities/occupation.entity';

export class GetManyOccupationUseCase
  implements IBaseUseCase<OccupationEntity[]>
{
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(
    filter: Partial<OccupationEntity>,
    pagination: PaginationModel,
    relation: FindOptionsRelations<OccupationEntity>,
  ): Promise<OccupationEntity[]> {
    return this.occupationRepository.findMany(filter, pagination, relation);
  }
}
