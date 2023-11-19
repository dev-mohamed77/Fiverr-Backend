import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';
import { PaginationModel } from 'src/application/core/model/pagination_model';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { CreateReviewUseCase } from 'src/domain/usecases/review/create_review_usecase';
import { DeleteOneReviewUseCase } from 'src/domain/usecases/review/delete_one_review_usecase';
import { DeleteReviewUseCase } from 'src/domain/usecases/review/delete_review_usecase';
import { GetManyReviewsUseCase } from 'src/domain/usecases/review/get_many_reviews_usecase';
import { GetOneReviewUseCase } from 'src/domain/usecases/review/get_one_review_usecase';
import { GetReviewByIdUseCase } from 'src/domain/usecases/review/get_review_by_id_usecase';
import { GetReviewsUseCase } from 'src/domain/usecases/review/get_reviews_usecase';
import { UpdateReviewUseCase } from 'src/domain/usecases/review/update_review_usecase';

@Injectable()
export class ReviewService {
  constructor(
    private createReviewUseCase: CreateReviewUseCase,
    private getReviewsUseCase: GetReviewsUseCase,
    private getReviewByIdUseCase: GetReviewByIdUseCase,
    private getOneReviewUseCase: GetOneReviewUseCase,
    private getManyReviewsUseCase: GetManyReviewsUseCase,
    private updateReviewUseCase: UpdateReviewUseCase,
    private deleteReviewUseCase: DeleteReviewUseCase,
    private deleteOneReviewUseCase: DeleteOneReviewUseCase,
  ) {}

  createReviewService(param: ReviewEntity) {
    return this.createReviewUseCase.execute(param);
  }

  getReviewsService(option: FindAllOptionTypOrmModel<ReviewEntity>) {
    return this.getReviewsUseCase.execute(option);
  }

  async getReviewByIdService(
    option: FindOneByIDOptionTypeOrmModel<ReviewEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.getReviewByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Review ${option.id} is not exist`);
    }

    return result;
  }

  async getOneReviewService(option: FindOneOptionTypeOrmModel<ReviewEntity>) {
    const result = await this.getOneReviewUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Review is not exist`);
    }

    return result;
  }

  getManyReviewsService(option: FindAllOptionTypOrmModel<ReviewEntity>) {
    return this.getManyReviewsUseCase.execute(option);
  }

  async updateReviewService(option: UpdateOptionTypeOrmModel<ReviewEntity>) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.updateReviewUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Review ${option.id} is not exist`);
    }

    return result;
  }

  async deleteReviewService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.deleteReviewUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(`Review ${id} is not exist`);
    }

    return result;
  }

  async deleteOneReviewService(filter: Partial<ReviewEntity>) {
    const result = await this.deleteOneReviewUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Review is not exist`);
    }

    return result;
  }
}
