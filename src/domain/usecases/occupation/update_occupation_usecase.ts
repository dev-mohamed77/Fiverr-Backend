import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IOccupationRepository } from '../../repositories/occupation.repository';
import { OccupationEntity } from '../../entities/occupation.entity';
import { updateOptionBase } from 'src/application/core/model/option_base_model';

export class UpdateOccupationUseCase implements IBaseUseCase<OccupationEntity> {
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(
    option: updateOptionBase<OccupationEntity>,
  ): Promise<OccupationEntity> {
    return this.occupationRepository.update(option);
  }
}
