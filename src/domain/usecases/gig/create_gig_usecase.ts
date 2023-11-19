import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { GigEntity } from 'src/domain/entities/gig.entity';
import { IGigRepository } from 'src/domain/repositories/gig.repository';

export class CreateGigUseCase implements IBaseUseCase<GigEntity> {
  constructor(private gigRepository: IGigRepository) {}

  execute(params: GigEntity): Promise<GigEntity> {
    return this.gigRepository.create(params);
  }
}
