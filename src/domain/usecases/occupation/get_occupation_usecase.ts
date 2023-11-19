import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { IOccupationRepository } from '../../repositories/occupation.repository';
import { OccupationEntity } from '../../entities/occupation.entity';

export class GetOccupationUseCase
  implements IBaseUseCase<[OccupationEntity[], number]>
{
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(
    pagination: PaginationModel,
    relation?: FindOptionsRelations<OccupationEntity>,
  ): Promise<[OccupationEntity[], number]> {
    return this.occupationRepository.findAll(pagination, relation);
  }
}
