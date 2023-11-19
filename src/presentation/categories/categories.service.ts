import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../domain/usecases/category/create_category_usecase';
import { GetCategoryByIdUseCase } from '../../domain/usecases/category/get_category_by_id_usecase';
import { GetCategoriesUseCase } from '../../domain/usecases/category/get_categories_usecase';
import { GetManyCategoriesUseCase } from '../../domain/usecases/category/get_many_categories_usecase';
import { GetOneCategoryUseCase } from '../../domain/usecases/category/get_one_category_usecase';
import { UpdateCategoryUseCase } from '../../domain/usecases/category/update_category_usecase';
import { DeleteCategoryUseCase } from '../../domain/usecases/category/delete_category_usecase';
import { DeleteOneCategoryUseCase } from '../../domain/usecases/category/delete_one_category_usecase';
import { CategoryEntity } from '../../domain/entities/category.entity';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';

@Injectable()
export class CategoriesService {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private getOneCategoryUseCase: GetOneCategoryUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private getManyCategoriesUseCase: GetManyCategoriesUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private deleteOneCategoryUseCase: DeleteOneCategoryUseCase,
  ) {}

  createCategoryService(params: CategoryEntity) {
    return this.createCategoryUseCase.execute(params);
  }

  async getCategoryByIdService(
    option: FindOneByIDOptionTypeOrmModel<CategoryEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.getCategoryByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Category ${option.id} is not exist`);
    }

    return result;
  }

  async getOneCategoryService(
    option: FindOneOptionTypeOrmModel<CategoryEntity>,
  ) {
    const result = await this.getOneCategoryUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Category is not exist`);
    }

    return result;
  }

  getCategoriesService(option: FindAllOptionTypOrmModel<CategoryEntity>) {
    return this.getCategoriesUseCase.execute(option);
  }

  getManyCategoriesService(option: FindAllOptionTypOrmModel<CategoryEntity>) {
    return this.getManyCategoriesUseCase.execute(option);
  }

  async updateCategoryService(
    option: UpdateOptionTypeOrmModel<CategoryEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.updateCategoryUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Category ${option.id} is not exist`);
    }

    return result;
  }

  async deleteCategoryService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.deleteCategoryUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(`Category ${id} is not exist`);
    }

    return result;
  }

  async deleteOneCategoryService(filter: Partial<CategoryEntity>) {
    const result = await this.deleteOneCategoryUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Category is not exist`);
    }

    return result;
  }
}
