import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { IOccupationRepository } from '../../repositories/occupation.repository';
import { OccupationEntity } from '../../entities/occupation.entity';

export class GetOccupationByIdUseCase
  implements IBaseUseCase<OccupationEntity>
{
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(
    id: string,
    relation?: FindOptionsRelations<OccupationEntity>,
  ): Promise<OccupationEntity> {
    return this.occupationRepository.findById(id, relation);
  }
}
