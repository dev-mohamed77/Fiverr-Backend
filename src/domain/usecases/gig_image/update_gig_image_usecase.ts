import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { GigImageEntity } from 'src/domain/entities/gig_image.entity';
import { IGigImageRepository } from 'src/domain/repositories/gig_image.repository';
import { updateOptionBase } from 'src/application/core/model/option_base_model';

export class UpdateGigImageUseCase implements IBaseUseCase<GigImageEntity> {
  constructor(private gigImageRepository: IGigImageRepository) {}

  execute(option: updateOptionBase<GigImageEntity>): Promise<GigImageEntity> {
    return this.gigImageRepository.update(option);
  }
}
