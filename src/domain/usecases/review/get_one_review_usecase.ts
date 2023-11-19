import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IReviewRepository } from 'src/domain/repositories/review.repository';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { FindOneOptionBase } from 'src/application/core/model/option_base_model';

export class GetOneReviewUseCase implements IBaseUseCase<ReviewEntity> {
  constructor(private reviewRepository: IReviewRepository) {}

  execute(option: FindOneOptionBase<ReviewEntity>): Promise<ReviewEntity> {
    return this.reviewRepository.findOne(option);
  }
}
