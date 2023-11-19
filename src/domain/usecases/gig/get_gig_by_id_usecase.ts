import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IGigRepository } from 'src/domain/repositories/gig.repository';
import { GigEntity } from 'src/domain/entities/gig.entity';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';

export class GetGigByIdUseCase implements IBaseUseCase<GigEntity> {
  constructor(private gigRepository: IGigRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<GigEntity> {
    return this.gigRepository.findById(option);
  }
}
