import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IOccupationRepository } from '../../repositories/occupation.repository';
import { OccupationEntity } from '../../entities/occupation.entity';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';

export class GetOccupationByIdUseCase
  implements IBaseUseCase<OccupationEntity>
{
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<OccupationEntity> {
    return this.occupationRepository.findById(option);
  }
}
