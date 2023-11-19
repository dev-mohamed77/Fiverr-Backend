import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';

export class UpdateFavoriteUseCase implements IBaseUseCase<FavoriteEntity> {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(
    id: string,
    params: Partial<FavoriteEntity>,
    relation?: FindOptionsRelations<FavoriteEntity>,
    select?: FindOptionsSelect<FavoriteEntity>,
  ): Promise<FavoriteEntity> {
    return this.favoriteRepository.update(id, params, relation, select);
  }
}
