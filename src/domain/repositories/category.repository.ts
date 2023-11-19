import IBaseRepository from '../../application/core/base/base_repository';
import { CategoryEntity } from '../entities/category.entity';

export abstract class ICategoryRepository extends IBaseRepository<CategoryEntity> {}
