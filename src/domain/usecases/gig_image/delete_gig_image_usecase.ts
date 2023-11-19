import { IGigImageRepository } from 'src/domain/repositories/gig_image.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';

export class DeleteGigImageUseCase implements IBaseUseCase<boolean> {
  constructor(private gigImageRepository: IGigImageRepository) {}

  execute(id: string): Promise<boolean> {
    return this.gigImageRepository.delete(id);
  }
}
