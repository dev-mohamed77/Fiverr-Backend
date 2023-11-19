import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryEntity } from 'src/domain/entities/category.entity';
import { FindOneOptionBase } from 'src/application/core/model/option_base_model';

export class GetOneCategoryUseCase implements IBaseUseCase<CategoryEntity> {
  constructor(private categoryRepository: ICategoryRepository) {}

  execute(option: FindOneOptionBase<CategoryEntity>): Promise<CategoryEntity> {
    return this.categoryRepository.findOne(option);
  }
}
