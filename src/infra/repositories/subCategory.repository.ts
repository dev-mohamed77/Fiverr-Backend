import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategory } from '../models/subCategory.model';
import { ISubCategoryRepository } from '../../domain/repositories/subCategory.repository';
import { SubCategoryEntity } from '../../domain/entities/subCategory.entity';

export class SubCategoryRepositoryImp
  extends BaseTypeOrmDataSource<SubCategoryEntity>
  implements ISubCategoryRepository
{
  constructor(
    @InjectRepository(SubCategory) repository: Repository<SubCategoryEntity>,
  ) {
    super(repository);
  }
}
