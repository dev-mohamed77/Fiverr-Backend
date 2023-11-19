import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigController } from './gig.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gig } from '../../infra/models/gig.model';
import { GigRepositoryImp } from '../../infra/repositories/gig.repository';
import { CreateGigUseCase } from '../../domain/usecases/gig/create_gig_usecase';
import { IGigRepository } from '../../domain/repositories/gig.repository';
import { CloudinaryModule } from '../../application/common/cloudinary/cloudinary.module';
import { GetManyGigsUseCase } from '../../domain/usecases/gig/get_many_gigs_usecase';
import { GetGigByIdUseCase } from '../../domain/usecases/gig/get_gig_by_id_usecase';
import { GetGigsUseCase } from '../../domain/usecases/gig/get_gigs_usecase';
import { GetOneGigUseCase } from '../../domain/usecases/gig/get_one_gig_usecase';
import { UpdateGigUseCase } from '../../domain/usecases/gig/update_gig_usecase';
import { DeleteGigUseCase } from '../../domain/usecases/gig/delete_gig_usecase';
import { DeleteOneGigUseCase } from '../../domain/usecases/gig/delete_one_gig_usecase';
import { GigCategoryController } from './gig-category.controller';
import { GigSellerController } from './gig-seller.controller';
import { GigSubCategoryController } from './gig-subCategory.controller';
import { GigImagesModule } from '../gig-images/gig-images.module';
import { UserModule } from '../user/user.module';
import { GigReviewController } from './gig-reviews.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gig]),
    MulterModule.register({
      storage: diskStorage({
        filename(req, file, callback) {
          callback(null, `${Date.now()} + ${file.originalname}`);
        },
      }),
    }),
    CloudinaryModule,
    GigImagesModule,
    UserModule,
  ],

  controllers: [
    GigSubCategoryController,
    GigReviewController,
    GigCategoryController,
    GigSellerController,
    GigController,
  ],
  exports: [GigService],
  providers: [
    GigService,
    {
      provide: GigRepositoryImp,
      useClass: GigRepositoryImp,
    },
    {
      provide: CreateGigUseCase,
      useFactory: (gigRepo: IGigRepository) => {
        return new CreateGigUseCase(gigRepo);
      },
      inject: [GigRepositoryImp],
    },
    {
      provide: GetManyGigsUseCase,
      useFactory: (gigRepo: IGigRepository) => {
        return new GetManyGigsUseCase(gigRepo);
      },
      inject: [GigRepositoryImp],
    },
    {
      provide: GetGigByIdUseCase,
      useFactory: (gigRepo: IGigRepository) => {
        return new GetGigByIdUseCase(gigRepo);
      },
      inject: [GigRepositoryImp],
    },
    {
      provide: GetGigsUseCase,
      useFactory: (gigRepo: IGigRepository) => {
        return new GetGigsUseCase(gigRepo);
      },
      inject: [GigRepositoryImp],
    },
    {
      provide: GetOneGigUseCase,
      useFactory: (gigRepo: IGigRepository) => {
        return new GetOneGigUseCase(gigRepo);
      },
      inject: [GigRepositoryImp],
    },
    {
      provide: UpdateGigUseCase,
      useFactory: (gigRepo: IGigRepository) => {
        return new UpdateGigUseCase(gigRepo);
      },
      inject: [GigRepositoryImp],
    },
    {
      provide: DeleteGigUseCase,
      useFactory: (gigRepo: IGigRepository) => {
        return new DeleteGigUseCase(gigRepo);
      },
      inject: [GigRepositoryImp],
    },
    {
      provide: DeleteOneGigUseCase,
      useFactory: (gigRepo: IGigRepository) => {
        return new DeleteOneGigUseCase(gigRepo);
      },
      inject: [GigRepositoryImp],
    },
  ],
})
export class GigModule {}
