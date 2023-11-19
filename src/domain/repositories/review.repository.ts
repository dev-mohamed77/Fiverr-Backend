import IBaseRepository from '../../application/core/base/base_repository';
import { ReviewEntity } from '../entities/review.entity';

export abstract class IReviewRepository extends IBaseRepository<ReviewEntity> {}
