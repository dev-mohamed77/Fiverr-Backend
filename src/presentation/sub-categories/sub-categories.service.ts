import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubCategoryUseCase } from '../../domain/usecases/subCategory/create_subCategory_usecase';
import { DeleteOneSubCategoryUseCase } from '../../domain/usecases/subCategory/delete_one_subCategory_usecase';
import { DeleteSubCategoryUseCase } from '../../domain/usecases/subCategory/delete_subCategory_usecase';
import { UpdateSubCategoryUseCase } from '../../domain/usecases/subCategory/update_subCategory_usecase';
import { GetManySubCategoriesUseCase } from '../../domain/usecases/subCategory/get_many_subCategory_usecase';
import { GetSubCategoriesUseCase } from '../../domain/usecases/subCategory/get_subCategory_usecase';
import { GetOneSubCategoryUseCase } from '../../domain/usecases/subCategory/get_one_subCategory_usecase';
import { GetSubCategoryByIdUseCase } from '../../domain/usecases/subCategory/get_subCategory_by_id_usecase';
import { SubCategoryEntity } from 'src/domain/entities/subCategory.entity';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';

@Injectable()
export class SubCategoriesService {
  constructor(
    private createSubCategoryUseCase: CreateSubCategoryUseCase,
    private getSubCategoryByIdUseCase: GetSubCategoryByIdUseCase,
    private getOneSubCategoryUseCase: GetOneSubCategoryUseCase,
    private getSubCategoriesUseCase: GetSubCategoriesUseCase,
    private getManySubCategoriesUseCase: GetManySubCategoriesUseCase,
    private updateSubCategoryUseCase: UpdateSubCategoryUseCase,
    private deleteSubCategoryUseCase: DeleteSubCategoryUseCase,
    private deleteOneSubCategoryUseCase: DeleteOneSubCategoryUseCase,
  ) {}

  createSubCategoryService(params: SubCategoryEntity) {
    return this.createSubCategoryUseCase.execute(params);
  }

  async getSubCategoryByIdService(
    option: FindOneByIDOptionTypeOrmModel<SubCategoryEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.getSubCategoryByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`SubCategory ${option.id} is not exist`);
    }

    return result;
  }

  async getOneSubCategoryService(
    option: FindOneOptionTypeOrmModel<SubCategoryEntity>,
  ) {
    const result = await this.getOneSubCategoryUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`SubCategory is not exist`);
    }

    return result;
  }

  getSubCategoriesService(option: FindAllOptionTypOrmModel<SubCategoryEntity>) {
    return this.getSubCategoriesUseCase.execute(option);
  }

  getManySubCategoriesService(
    option: FindAllOptionTypOrmModel<SubCategoryEntity>,
  ) {
    return this.getManySubCategoriesUseCase.execute(option);
  }

  async updateSubCategoryService(
    option: UpdateOptionTypeOrmModel<SubCategoryEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.updateSubCategoryUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`SubCategory ${option.id} is not exist`);
    }

    return result;
  }

  async deleteSubCategoryService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.deleteSubCategoryUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(`SubCategory ${id} is not exist`);
    }

    return result;
  }

  async deleteOneSubCategoryService(filter: Partial<SubCategoryEntity>) {
    const result = await this.deleteOneSubCategoryUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`SubCategory is not exist`);
    }

    return result;
  }
}
