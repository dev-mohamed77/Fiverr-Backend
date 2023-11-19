import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISubCategoryRepository } from 'src/domain/repositories/subCategory.repository';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { updateOptionBase } from 'src/application/core/model/option_base_model';

export class UpdateSubCategoryUseCase
  implements IBaseUseCase<SubCategoryEntity>
{
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  execute(
    option: updateOptionBase<SubCategoryEntity>,
  ): Promise<SubCategoryEntity> {
    return this.subCategoryRepository.update(option);
  }
}
