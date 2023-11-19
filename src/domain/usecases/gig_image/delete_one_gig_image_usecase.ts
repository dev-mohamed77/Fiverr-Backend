import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { GigEntity } from 'src/domain/entities/gig.entity';
import { IGigImageRepository } from 'src/domain/repositories/gig_image.repository';

export class DeleteOneGigImageUseCase implements IBaseUseCase<boolean> {
  constructor(private gigImageRepository: IGigImageRepository) {}

  execute(filter: Partial<GigEntity>): Promise<boolean> {
    return this.gigImageRepository.deleteOne(filter);
  }
}
