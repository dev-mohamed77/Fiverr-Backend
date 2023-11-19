import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { OccupationEntity } from '../../entities/occupation.entity';
import { IOccupationRepository } from '../../repositories/occupation.repository';
import { FindOneOptionBase } from 'src/application/core/model/option_base_model';

export class GetOneOccupationUseCase implements IBaseUseCase<OccupationEntity> {
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(
    option: FindOneOptionBase<OccupationEntity>,
  ): Promise<OccupationEntity> {
    return this.occupationRepository.findOne(option);
  }
}
