import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IGigRepository } from 'src/domain/repositories/gig.repository';
import { GigEntity } from 'src/domain/entities/gig.entity';

export class DeleteOneGigUseCase implements IBaseUseCase<boolean> {
  constructor(private gigRepository: IGigRepository) {}

  execute(filter: Partial<GigEntity>): Promise<boolean> {
    return this.gigRepository.deleteOne(filter);
  }
}
