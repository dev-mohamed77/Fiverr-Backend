import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';

export class GetOneFavoriteUseCase implements IBaseUseCase<FavoriteEntity> {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(
    filter: Partial<FavoriteEntity>,
    relation?: FindOptionsRelations<FavoriteEntity>,
    select?: FindOptionsSelect<FavoriteEntity>,
  ): Promise<FavoriteEntity> {
    return this.favoriteRepository.findOne(filter, relation, select);
  }
}
