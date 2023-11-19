import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

export class GetFavoritesUseCase
  implements IBaseUseCase<[FavoriteEntity[], number]>
{
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(
    pagination: PaginationModel,
    relation?: FindOptionsRelations<FavoriteEntity>,
    select?: FindOptionsSelect<FavoriteEntity>,
    filter?: FindOptionsWhere<FavoriteEntity>,
  ): Promise<[FavoriteEntity[], number]> {
    return this.favoriteRepository.findAll(
      pagination,
      relation,
      select,
      filter,
    );
  }
}
