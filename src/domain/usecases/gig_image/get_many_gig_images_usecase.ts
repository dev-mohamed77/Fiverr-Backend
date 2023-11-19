import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { GigImageEntity } from 'src/domain/entities/gig_image.entity';
import { IGigImageRepository } from 'src/domain/repositories/gig_image.repository';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetManyGigImagesUseCase
  implements IBaseUseCase<[GigImageEntity[], number]>
{
  constructor(private gigImageRepository: IGigImageRepository) {}

  execute(option: FindAllOptionBase): Promise<[GigImageEntity[], number]> {
    return this.gigImageRepository.findMany(option);
  }
}
