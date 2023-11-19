import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFavoriteUseCase } from '../../domain/usecases/favorite/create_favorite_usecase';
import { GetFavoritesUseCase } from '../../domain/usecases/favorite/get_favorites_usecase';
import { GetFavoriteByIdUseCase } from '../../domain/usecases/favorite/get_favorite_by_id_usecase';
import { GetOneFavoriteUseCase } from '../../domain/usecases/favorite/get_one_favorite_usecase';
import { GetManyFavoritesUseCase } from '../../domain/usecases/favorite/get_many_favorites_usecase';
import { DeleteOneFavoriteUseCase } from '../../domain/usecases/favorite/delete_one_favorite_usecase';
import { DeleteFavoriteUseCase } from '../../domain/usecases/favorite/delete_favorite_usecase';
import { UpdateFavoriteUseCase } from '../../domain/usecases/favorite/update_favorite_usecase';
import { FavoriteEntity } from '../../domain/entities/favorite.entity';
import { PaginationModel } from '../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';

@Injectable()
export class FavoriteService {
  constructor(
    private createFavoriteUseCase: CreateFavoriteUseCase,
    private getFavoritesUseCase: GetFavoritesUseCase,
    private getFavoriteByIdUseCase: GetFavoriteByIdUseCase,
    private getOneFavoriteUseCase: GetOneFavoriteUseCase,
    private getManyFavoritesUseCase: GetManyFavoritesUseCase,
    private updateFavoriteUseCase: UpdateFavoriteUseCase,
    private deleteFavoriteUseCase: DeleteFavoriteUseCase,
    private deleteOneFavoriteUseCase: DeleteOneFavoriteUseCase,
  ) {}

  createFavoriteService(param: FavoriteEntity) {
    return this.createFavoriteUseCase.execute(param);
  }

  getFavoritesService(option: FindAllOptionTypOrmModel<FavoriteEntity>) {
    return this.getFavoritesUseCase.execute(option);
  }

  async getFavoriteByIdService(
    option: FindOneByIDOptionTypeOrmModel<FavoriteEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.getFavoriteByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Favorite ${option.id} is not exist`);
    }

    return result;
  }

  async getOneFavoriteService(
    option: FindOneOptionTypeOrmModel<FavoriteEntity>,
  ) {
    const result = await this.getOneFavoriteUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Favorite is not exist`);
    }

    return result;
  }

  getManyFavoritesService(option: FindAllOptionTypOrmModel<FavoriteEntity>) {
    return this.getManyFavoritesUseCase.execute(option);
  }

  async updateFavoriteService(
    option: UpdateOptionTypeOrmModel<FavoriteEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.updateFavoriteUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Favorite ${option.id} is not exist`);
    }

    return result;
  }

  async deleteFavoriteService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.deleteFavoriteUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(`Favorite ${id} is not exist`);
    }

    return result;
  }

  async deleteOneFavoriteService(filter: Partial<FavoriteEntity>) {
    const result = await this.deleteOneFavoriteUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Favorite is not exist`);
    }

    return result;
  }
}
