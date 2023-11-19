import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISubCategoryRepository } from 'src/domain/repositories/subCategory.repository';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetSubCategoriesUseCase
  implements IBaseUseCase<[SubCategoryEntity[], number]>
{
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  execute(option: FindAllOptionBase): Promise<[SubCategoryEntity[], number]> {
    return this.subCategoryRepository.findAll(option);
  }
}
