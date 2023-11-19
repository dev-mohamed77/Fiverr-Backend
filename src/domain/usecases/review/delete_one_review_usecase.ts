import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IReviewRepository } from 'src/domain/repositories/review.repository';
import { ReviewEntity } from 'src/domain/entities/review.entity';

export class DeleteOneReviewUseCase implements IBaseUseCase<boolean> {
  constructor(private reviewRepository: IReviewRepository) {}

  execute(filter: Partial<ReviewEntity>): Promise<boolean> {
    return this.reviewRepository.deleteOne(filter);
  }
}
