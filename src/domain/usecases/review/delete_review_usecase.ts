import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IReviewRepository } from 'src/domain/repositories/review.repository';

export class DeleteReviewUseCase implements IBaseUseCase<boolean> {
  constructor(private reviewRepository: IReviewRepository) {}

  execute(id: string): Promise<boolean> {
    return this.reviewRepository.delete(id);
  }
}
