import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';

export class GetManyFavoritesUseCase implements IBaseUseCase<FavoriteEntity[]> {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(
    filter: Partial<FavoriteEntity>,
    pagination: PaginationModel,
    relation?: FindOptionsRelations<FavoriteEntity>,
    select?: FindOptionsSelect<FavoriteEntity>,
  ): Promise<FavoriteEntity[]> {
    return this.favoriteRepository.findMany(
      filter,
      pagination,
      relation,
      select,
    );
  }
}
