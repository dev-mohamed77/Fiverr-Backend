import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { Category } from '../models/category.model';

export class CategoryRepositoryImp
  extends BaseTypeOrmDataSource<CategoryEntity>
  implements ICategoryRepository
{
  constructor(
    @InjectRepository(Category) repository: Repository<CategoryEntity>,
  ) {
    super(repository);
  }
}
