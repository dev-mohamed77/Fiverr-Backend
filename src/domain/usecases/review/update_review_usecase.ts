import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { IReviewRepository } from 'src/domain/repositories/review.repository';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { updateOptionBase } from 'src/application/core/model/option_base_model';

export class UpdateReviewUseCase implements IBaseUseCase<ReviewEntity> {
  constructor(private reviewRepository: IReviewRepository) {}

  execute(option: updateOptionBase<ReviewEntity>): Promise<ReviewEntity> {
    return this.reviewRepository.update(option);
  }
}
