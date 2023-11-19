import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepositoryImp } from 'src/infra/repositories/review.repository';
import { IReviewRepository } from 'src/domain/repositories/review.repository';
import { CreateReviewUseCase } from 'src/domain/usecases/review/create_review_usecase';
import { GetReviewByIdUseCase } from 'src/domain/usecases/review/get_review_by_id_usecase';
import { GetReviewsUseCase } from 'src/domain/usecases/review/get_reviews_usecase';
import { GetOneReviewUseCase } from 'src/domain/usecases/review/get_one_review_usecase';
import { GetManyReviewsUseCase } from 'src/domain/usecases/review/get_many_reviews_usecase';
import { UpdateReviewUseCase } from 'src/domain/usecases/review/update_review_usecase';
import { DeleteOneReviewUseCase } from 'src/domain/usecases/review/delete_one_review_usecase';
import { DeleteReviewUseCase } from 'src/domain/usecases/review/delete_review_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/infra/models/review.model';
import { ReviewsGigController } from './review-gigs.controller';
import { UserModule } from '../user/user.module';
import { GigModule } from '../gig/gig.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UserModule, GigModule],
  controllers: [ReviewController, ReviewsGigController, ReviewsGigController],
  providers: [
    ReviewService,
    {
      provide: ReviewRepositoryImp,
      useClass: ReviewRepositoryImp,
    },
    {
      provide: CreateReviewUseCase,
      useFactory: (reviewRepo: IReviewRepository) => {
        return new CreateReviewUseCase(reviewRepo);
      },
      inject: [ReviewRepositoryImp],
    },
    {
      provide: GetReviewByIdUseCase,
      useFactory: (reviewRepo: IReviewRepository) => {
        return new GetReviewByIdUseCase(reviewRepo);
      },
      inject: [ReviewRepositoryImp],
    },
    {
      provide: GetReviewsUseCase,
      useFactory: (reviewRepo: IReviewRepository) => {
        return new GetReviewsUseCase(reviewRepo);
      },
      inject: [ReviewRepositoryImp],
    },
    {
      provide: GetOneReviewUseCase,
      useFactory: (reviewRepo: IReviewRepository) => {
        return new GetOneReviewUseCase(reviewRepo);
      },
      inject: [ReviewRepositoryImp],
    },
    {
      provide: GetManyReviewsUseCase,
      useFactory: (reviewRepo: IReviewRepository) => {
        return new GetManyReviewsUseCase(reviewRepo);
      },
      inject: [ReviewRepositoryImp],
    },
    {
      provide: UpdateReviewUseCase,
      useFactory: (reviewRepo: IReviewRepository) => {
        return new UpdateReviewUseCase(reviewRepo);
      },
      inject: [ReviewRepositoryImp],
    },
    {
      provide: DeleteOneReviewUseCase,
      useFactory: (reviewRepo: IReviewRepository) => {
        return new DeleteOneReviewUseCase(reviewRepo);
      },
      inject: [ReviewRepositoryImp],
    },
    {
      provide: DeleteReviewUseCase,
      useFactory: (reviewRepo: IReviewRepository) => {
        return new DeleteReviewUseCase(reviewRepo);
      },
      inject: [ReviewRepositoryImp],
    },
  ],
})
export class ReviewModule {}
