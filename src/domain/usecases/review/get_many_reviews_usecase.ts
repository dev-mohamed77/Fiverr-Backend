import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { IReviewRepository } from 'src/domain/repositories/review.repository';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetManyReviewsUseCase
  implements IBaseUseCase<[ReviewEntity[], number]>
{
  constructor(private reviewRepository: IReviewRepository) {}

  execute(option: FindAllOptionBase): Promise<[ReviewEntity[], number]> {
    return this.reviewRepository.findMany(option);
  }
}
