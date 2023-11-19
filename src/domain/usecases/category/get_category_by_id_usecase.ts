import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { FindOneOptionTypeOrmModel } from 'src/application/core/model/options_typeorm_model';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';

export class GetCategoryByIdUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<CategoryEntity> {
    return this.categoryRepository.findById(option);
  }
}
