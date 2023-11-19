import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IOccupationRepository } from '../../repositories/occupation.repository';
import { OccupationEntity } from '../../entities/occupation.entity';

export class UpdateOccupationUseCase implements IBaseUseCase<OccupationEntity> {
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(id: string, params: OccupationEntity): Promise<OccupationEntity> {
    return this.occupationRepository.update(id, params);
  }
}
