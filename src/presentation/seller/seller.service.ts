import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSellerUseCase } from '../../domain/usecases/seller/create_seller_usecase';
import { GetSellersUseCase } from '../../domain/usecases/seller/get_sellers_usecase';
import { GetManySellerUseCase } from '../../domain/usecases/seller/get_many_seller_usecase';
import { GetSellerByIdUseCase } from '../../domain/usecases/seller/get_seller_by_id_usecase';
import { GetOneSellerUseCase } from '../../domain/usecases/seller/get_one_seller_usecase';
import { UpdateSellerUseCase } from '../../domain/usecases/seller/update_seller_usecase';
import { DeleteSellerUseCase } from '../../domain/usecases/seller/delete_seller_usecase';
import { DeleteOneSellerUseCase } from '../../domain/usecases/seller/delete_one_seller_usecase';
import SellerEntity from '../../domain/entities/seller.entity';
import { PaginationModel } from '../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';

@Injectable()
export class SellerService {
  constructor(
    private createSellerUseCase: CreateSellerUseCase,
    private getSellersUseCase: GetSellersUseCase,
    private getManySellersUseCase: GetManySellerUseCase,
    private getSellerByIdUseCase: GetSellerByIdUseCase,
    private getOneSellerUseCase: GetOneSellerUseCase,
    private updateSellerUseCase: UpdateSellerUseCase,
    private deleteSellerUseCase: DeleteSellerUseCase,
    private deleteOneSellerUseCase: DeleteOneSellerUseCase,
  ) {}

  createSellerService(params: SellerEntity) {
    return this.createSellerUseCase.execute(params);
  }

  getSellersService(option: FindAllOptionTypOrmModel<SellerEntity>) {
    return this.getSellersUseCase.execute(option);
  }

  getManySellersService(option: FindAllOptionTypOrmModel<SellerEntity>) {
    return this.getManySellersUseCase.execute(option);
  }

  async getSellerByIdService(
    option: FindOneByIDOptionTypeOrmModel<SellerEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.getSellerByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Seller ${option.id} is not exist`);
    }

    return result;
  }

  async getOneSellerService(option: FindOneOptionTypeOrmModel<SellerEntity>) {
    const result = await this.getOneSellerUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Seller is not exist`);
    }

    return result;
  }

  async updateSellerService(option: UpdateOptionTypeOrmModel<SellerEntity>) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.updateSellerUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Seller ${option.id} is not exist`);
    }

    return result;
  }

  async deleteSellerService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.deleteSellerUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(`Seller ${id} is not exist`);
    }

    return result;
  }

  async deleteOneSellerService(filter: Partial<SellerEntity>) {
    const result = await this.deleteOneSellerUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Seller is not exist`);
    }

    return result;
  }
}
