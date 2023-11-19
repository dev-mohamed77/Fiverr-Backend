import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { IReviewRepository } from 'src/domain/repositories/review.repository';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';

export class GetReviewByIdUseCase implements IBaseUseCase<ReviewEntity> {
  constructor(private reviewRepository: IReviewRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<ReviewEntity> {
    return this.reviewRepository.findById(option);
  }
}
