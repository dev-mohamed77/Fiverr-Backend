import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { ReviewEntity } from '../../domain/entities/review.entity';
import { IReviewRepository } from '../../domain/repositories/review.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../models/review.model';
import { Repository } from 'typeorm';

export class ReviewRepositoryImp
  extends BaseTypeOrmDataSource<ReviewEntity>
  implements IReviewRepository
{
  constructor(@InjectRepository(Review) repository: Repository<ReviewEntity>) {
    super(repository);
  }
}
