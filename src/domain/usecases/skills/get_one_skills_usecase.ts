import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { OccupationEntity } from '../../entities/occupation.entity';
import { IOccupationRepository } from '../../repositories/occupation.repository';

export class GetOneOccupationUseCase implements IBaseUseCase<OccupationEntity> {
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(
    filter: Partial<OccupationEntity>,
    relation?: FindOptionsRelations<OccupationEntity>,
  ): Promise<OccupationEntity> {
    return this.occupationRepository.findOne(filter, relation);
  }
}
