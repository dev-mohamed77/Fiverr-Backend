import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IOccupationRepository } from '../../repositories/occupation.repository';
import { OccupationEntity } from '../../entities/occupation.entity';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetOccupationsUseCase
  implements IBaseUseCase<[OccupationEntity[], number]>
{
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(option: FindAllOptionBase): Promise<[OccupationEntity[], number]> {
    return this.occupationRepository.findAll(option);
  }
}
