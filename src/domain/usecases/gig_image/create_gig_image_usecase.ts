import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { GigImageEntity } from 'src/domain/entities/gig_image.entity';
import { IGigImageRepository } from 'src/domain/repositories/gig_image.repository';

export class CreateGigImageUseCase implements IBaseUseCase<GigImageEntity> {
  constructor(private gigImageRepository: IGigImageRepository) {}

  execute(params: GigImageEntity): Promise<GigImageEntity> {
    return this.gigImageRepository.create(params);
  }
}
