import IBaseRepository from '../../application/core/base/base_repository';
import { SubCategoryEntity } from '../entities/subCategory.entity';

export abstract class ISubCategoryRepository extends IBaseRepository<SubCategoryEntity> {}
