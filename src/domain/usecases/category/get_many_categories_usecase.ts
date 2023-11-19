import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { FindAllOptionTypOrmModel } from 'src/application/core/model/options_typeorm_model';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetManyCategoriesUseCase
  implements IBaseUseCase<[CategoryEntity[], number]>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(option: FindAllOptionBase): Promise<[CategoryEntity[], number]> {
    return this.categoryRepository.findMany(option);
  }
}
