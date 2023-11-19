import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IGigRepository } from 'src/domain/repositories/gig.repository';

export class DeleteGigUseCase implements IBaseUseCase<boolean> {
  constructor(private gigRepository: IGigRepository) {}

  execute(id: string): Promise<boolean> {
    return this.gigRepository.delete(id);
  }
}
