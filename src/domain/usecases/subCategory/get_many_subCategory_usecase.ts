import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import { ISubCategoryRepository } from 'src/domain/repositories/subCategory.repository';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetManySubCategoriesUseCase
  implements IBaseUseCase<[SubCategoryEntity[], number]>
{
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  execute(option: FindAllOptionBase): Promise<[SubCategoryEntity[], number]> {
    return this.subCategoryRepository.findMany(option);
  }
}
