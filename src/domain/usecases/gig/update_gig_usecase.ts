import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { GigEntity } from 'src/domain/entities/gig.entity';
import { IGigRepository } from 'src/domain/repositories/gig.repository';
import { updateOptionBase } from 'src/application/core/model/option_base_model';

export class UpdateGigUseCase implements IBaseUseCase<GigEntity> {
  constructor(private gigRepository: IGigRepository) {}

  execute(option: updateOptionBase<GigEntity>): Promise<GigEntity> {
    return this.gigRepository.update(option);
  }
}
