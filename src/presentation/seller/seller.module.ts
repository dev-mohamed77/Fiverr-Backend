import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { SellerRepositoryImp } from '../../infra/repositories/seller.repository';
import { CreateSellerUseCase } from '../../domain/usecases/seller/create_seller_usecase';
import { ISellerRepository } from '../../domain/repositories/seller.repository';
import { GetSellersUseCase } from '../../domain/usecases/seller/get_sellers_usecase';
import { GetManySellerUseCase } from '../../domain/usecases/seller/get_many_seller_usecase';
import { GetSellerByIdUseCase } from '../../domain/usecases/seller/get_seller_by_id_usecase';
import { GetOneSellerUseCase } from '../../domain/usecases/seller/get_one_seller_usecase';
import { UpdateSellerUseCase } from '../../domain/usecases/seller/update_seller_usecase';
import { DeleteSellerUseCase } from '../../domain/usecases/seller/delete_seller_usecase';
import { DeleteOneSellerUseCase } from '../../domain/usecases/seller/delete_one_seller_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from '../../infra/models/seller.model';
import { UserModule } from '../user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CloudinaryModule } from '../../application/common/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seller]),
    MulterModule.register({
      storage: diskStorage({
        filename(req, file, callback) {
          callback(null, `${Date.now()} + ${file.originalname}`);
        },
      }),
    }),
    UserModule,
    CloudinaryModule,
  ],
  exports: [SellerService],
  controllers: [SellerController],
  providers: [
    SellerService,
    { provide: SellerRepositoryImp, useClass: SellerRepositoryImp },
    {
      provide: CreateSellerUseCase,
      useFactory: (sellerRepo: ISellerRepository) => {
        return new CreateSellerUseCase(sellerRepo);
      },
      inject: [SellerRepositoryImp],
    },
    {
      provide: CreateSellerUseCase,
      useFactory: (sellerRepo: ISellerRepository) => {
        return new CreateSellerUseCase(sellerRepo);
      },
      inject: [SellerRepositoryImp],
    },
    {
      provide: GetSellersUseCase,
      useFactory: (sellerRepo: ISellerRepository) => {
        return new GetSellersUseCase(sellerRepo);
      },
      inject: [SellerRepositoryImp],
    },
    {
      provide: GetManySellerUseCase,
      useFactory: (sellerRepo: ISellerRepository) => {
        return new GetManySellerUseCase(sellerRepo);
      },
      inject: [SellerRepositoryImp],
    },
    {
      provide: GetSellerByIdUseCase,
      useFactory: (sellerRepo: ISellerRepository) => {
        return new GetSellerByIdUseCase(sellerRepo);
      },
      inject: [SellerRepositoryImp],
    },
    {
      provide: GetOneSellerUseCase,
      useFactory: (sellerRepo: ISellerRepository) => {
        return new GetOneSellerUseCase(sellerRepo);
      },
      inject: [SellerRepositoryImp],
    },
    {
      provide: UpdateSellerUseCase,
      useFactory: (sellerRepo: ISellerRepository) => {
        return new UpdateSellerUseCase(sellerRepo);
      },
      inject: [SellerRepositoryImp],
    },
    {
      provide: DeleteSellerUseCase,
      useFactory: (sellerRepo: ISellerRepository) => {
        return new DeleteSellerUseCase(sellerRepo);
      },
      inject: [SellerRepositoryImp],
    },
    {
      provide: DeleteOneSellerUseCase,
      useFactory: (sellerRepo: ISellerRepository) => {
        return new DeleteOneSellerUseCase(sellerRepo);
      },
      inject: [SellerRepositoryImp],
    },
  ],
})
export class SellerModule {}
