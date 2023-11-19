import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { IReviewRepository } from 'src/domain/repositories/review.repository';

export class CreateReviewUseCase implements IBaseUseCase<ReviewEntity> {
  constructor(private reviewRepository: IReviewRepository) {}

  execute(params: ReviewEntity): Promise<ReviewEntity> {
    return this.reviewRepository.create(params);
  }
}
