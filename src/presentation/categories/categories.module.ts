import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepositoryImp } from 'src/infra/repositories/category.repository';
import { CreateCategoryUseCase } from 'src/domain/usecases/category/create_category_usecase';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { GetManyCategoriesUseCase } from 'src/domain/usecases/category/get_many_categories_usecase';
import { GetCategoryByIdUseCase } from 'src/domain/usecases/category/get_category_by_id_usecase';
import { GetCategoriesUseCase } from 'src/domain/usecases/category/get_categories_usecase';
import { GetOneCategoryUseCase } from 'src/domain/usecases/category/get_one_category_usecase';
import { UpdateCategoryUseCase } from 'src/domain/usecases/category/update_category_usecase';
import { DeleteCategoryUseCase } from 'src/domain/usecases/category/delete_category_usecase';
import { DeleteOneCategoryUseCase } from 'src/domain/usecases/category/delete_one_category_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../infra/models/category.model';
import { UserModule } from '../user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CloudinaryModule } from 'src/application/common/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    UserModule,
    MulterModule.register({
      storage: diskStorage({
        filename(req, file, callback) {
          callback(null, `${Date.now()} + ${file.originalname}`);
        },
      }),
    }),
    CloudinaryModule,
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: CategoryRepositoryImp,
      useClass: CategoryRepositoryImp,
    },
    {
      provide: CreateCategoryUseCase,
      useFactory: (categoryRepo: ICategoryRepository) => {
        return new CreateCategoryUseCase(categoryRepo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: GetManyCategoriesUseCase,
      useFactory: (categoryRepo: ICategoryRepository) => {
        return new GetManyCategoriesUseCase(categoryRepo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: GetCategoryByIdUseCase,
      useFactory: (categoryRepo: ICategoryRepository) => {
        return new GetCategoryByIdUseCase(categoryRepo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: GetCategoriesUseCase,
      useFactory: (categoryRepo: ICategoryRepository) => {
        return new GetCategoriesUseCase(categoryRepo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: GetOneCategoryUseCase,
      useFactory: (categoryRepo: ICategoryRepository) => {
        return new GetOneCategoryUseCase(categoryRepo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: UpdateCategoryUseCase,
      useFactory: (categoryRepo: ICategoryRepository) => {
        return new UpdateCategoryUseCase(categoryRepo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: DeleteCategoryUseCase,
      useFactory: (categoryRepo: ICategoryRepository) => {
        return new DeleteCategoryUseCase(categoryRepo);
      },
      inject: [CategoryRepositoryImp],
    },
    {
      provide: DeleteOneCategoryUseCase,
      useFactory: (categoryRepo: ICategoryRepository) => {
        return new DeleteOneCategoryUseCase(categoryRepo);
      },
      inject: [CategoryRepositoryImp],
    },
  ],
})
export class CategoriesModule {}
