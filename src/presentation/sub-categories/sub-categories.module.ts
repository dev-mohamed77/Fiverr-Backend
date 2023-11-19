import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoryRepositoryImp } from 'src/infra/repositories/subCategory.repository';
import { ISubCategoryRepository } from 'src/domain/repositories/subCategory.repository';
import { CreateSubCategoryUseCase } from 'src/domain/usecases/subCategory/create_subCategory_usecase';
import { GetManySubCategoriesUseCase } from 'src/domain/usecases/subCategory/get_many_subCategory_usecase';
import { GetSubCategoryByIdUseCase } from 'src/domain/usecases/subCategory/get_subCategory_by_id_usecase';
import { GetSubCategoriesUseCase } from 'src/domain/usecases/subCategory/get_subCategory_usecase';
import { GetOneSubCategoryUseCase } from 'src/domain/usecases/subCategory/get_one_subCategory_usecase';
import { UpdateSubCategoryUseCase } from 'src/domain/usecases/subCategory/update_subCategory_usecase';
import { DeleteSubCategoryUseCase } from 'src/domain/usecases/subCategory/delete_subCategory_usecase';
import { DeleteOneSubCategoryUseCase } from 'src/domain/usecases/subCategory/delete_one_subCategory_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from '../../infra/models/subCategory.model';
import { UserModule } from '../user/user.module';
import { SubCategoryWithCategoryController } from './sub-category-with-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory]), UserModule],
  controllers: [SubCategoriesController, SubCategoryWithCategoryController],
  providers: [
    SubCategoriesService,
    {
      provide: SubCategoryRepositoryImp,
      useClass: SubCategoryRepositoryImp,
    },
    {
      provide: CreateSubCategoryUseCase,
      useFactory: (subCategoryRepo: ISubCategoryRepository) => {
        return new CreateSubCategoryUseCase(subCategoryRepo);
      },
      inject: [SubCategoryRepositoryImp],
    },
    {
      provide: GetManySubCategoriesUseCase,
      useFactory: (subCategoryRepo: ISubCategoryRepository) => {
        return new GetManySubCategoriesUseCase(subCategoryRepo);
      },
      inject: [SubCategoryRepositoryImp],
    },
    {
      provide: GetSubCategoryByIdUseCase,
      useFactory: (subCategoryRepo: ISubCategoryRepository) => {
        return new GetSubCategoryByIdUseCase(subCategoryRepo);
      },
      inject: [SubCategoryRepositoryImp],
    },
    {
      provide: GetSubCategoriesUseCase,
      useFactory: (subCategoryRepo: ISubCategoryRepository) => {
        return new GetSubCategoriesUseCase(subCategoryRepo);
      },
      inject: [SubCategoryRepositoryImp],
    },
    {
      provide: GetOneSubCategoryUseCase,
      useFactory: (subCategoryRepo: ISubCategoryRepository) => {
        return new GetOneSubCategoryUseCase(subCategoryRepo);
      },
      inject: [SubCategoryRepositoryImp],
    },
    {
      provide: UpdateSubCategoryUseCase,
      useFactory: (subCategoryRepo: ISubCategoryRepository) => {
        return new UpdateSubCategoryUseCase(subCategoryRepo);
      },
      inject: [SubCategoryRepositoryImp],
    },
    {
      provide: DeleteSubCategoryUseCase,
      useFactory: (subCategoryRepo: ISubCategoryRepository) => {
        return new DeleteSubCategoryUseCase(subCategoryRepo);
      },
      inject: [SubCategoryRepositoryImp],
    },
    {
      provide: DeleteOneSubCategoryUseCase,
      useFactory: (subCategoryRepo: ISubCategoryRepository) => {
        return new DeleteOneSubCategoryUseCase(subCategoryRepo);
      },
      inject: [SubCategoryRepositoryImp],
    },
  ],
})
export class SubCategoriesModule {}
