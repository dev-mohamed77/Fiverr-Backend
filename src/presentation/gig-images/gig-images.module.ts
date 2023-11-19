import { Module, forwardRef } from '@nestjs/common';
import { GigImagesService } from './gig-images.service';
import { GigImagesController } from './gig-images.controller';
import { GigImageRepositoryImp } from '../../infra/repositories/gig_image.repository';
import { IGigImageRepository } from '../../domain/repositories/gig_image.repository';
import { GetGigImagesUseCase } from '../../domain/usecases/gig_image/get_gig_images_usecase';
import { GetGigImageByIdUseCase } from '../../domain/usecases/gig_image/get_gig_image_by_id_usecase';
import { GetManyGigImagesUseCase } from '../../domain/usecases/gig_image/get_many_gig_images_usecase';
import { UpdateGigImageUseCase } from '../../domain/usecases/gig_image/update_gig_image_usecase';
import { DeleteGigImageUseCase } from '../../domain/usecases/gig_image/delete_gig_image_usecase';
import { DeleteOneGigImageUseCase } from '../../domain/usecases/gig_image/delete_one_gig_image_usecase';
import { GetOneGigImageUseCase } from '../../domain/usecases/gig_image/get_one_get_image_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GigImage } from '../../infra/models/gig_image.model';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from '../../application/common/cloudinary/cloudinary.module';
import { diskStorage } from 'multer';
import { CreateGigImageUseCase } from '../../domain/usecases/gig_image/create_gig_image_usecase';
import { UserModule } from '../user/user.module';
import { GigModule } from '../gig/gig.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GigImage]),
    MulterModule.register({
      storage: diskStorage({
        filename(req, file, callback) {
          callback(null, `${Date.now()} + ${file.originalname}`);
        },
      }),
    }),
    CloudinaryModule,
    UserModule,
    forwardRef(() => GigModule),
  ],
  controllers: [GigImagesController],
  exports: [GigImagesService],
  providers: [
    GigImagesService,
    {
      provide: GigImageRepositoryImp,
      useClass: GigImageRepositoryImp,
    },
    {
      provide: CreateGigImageUseCase,
      useFactory: (gigImageRepo: IGigImageRepository) => {
        return new CreateGigImageUseCase(gigImageRepo);
      },
      inject: [GigImageRepositoryImp],
    },
    {
      provide: GetGigImageByIdUseCase,
      useFactory: (gigImageRepo: IGigImageRepository) => {
        return new GetGigImageByIdUseCase(gigImageRepo);
      },
      inject: [GigImageRepositoryImp],
    },
    {
      provide: GetOneGigImageUseCase,
      useFactory: (gigImageRepo: IGigImageRepository) => {
        return new GetOneGigImageUseCase(gigImageRepo);
      },
      inject: [GigImageRepositoryImp],
    },
    {
      provide: GetGigImagesUseCase,
      useFactory: (gigImageRepo: IGigImageRepository) => {
        return new GetGigImagesUseCase(gigImageRepo);
      },
      inject: [GigImageRepositoryImp],
    },
    {
      provide: GetManyGigImagesUseCase,
      useFactory: (gigImageRepo: IGigImageRepository) => {
        return new GetManyGigImagesUseCase(gigImageRepo);
      },
      inject: [GigImageRepositoryImp],
    },
    {
      provide: UpdateGigImageUseCase,
      useFactory: (gigImageRepo: IGigImageRepository) => {
        return new UpdateGigImageUseCase(gigImageRepo);
      },
      inject: [GigImageRepositoryImp],
    },
    {
      provide: DeleteGigImageUseCase,
      useFactory: (gigImageRepo: IGigImageRepository) => {
        return new DeleteGigImageUseCase(gigImageRepo);
      },
      inject: [GigImageRepositoryImp],
    },
    {
      provide: DeleteOneGigImageUseCase,
      useFactory: (gigImageRepo: IGigImageRepository) => {
        return new DeleteOneGigImageUseCase(gigImageRepo);
      },
      inject: [GigImageRepositoryImp],
    },
  ],
})
export class GigImagesModule {}
