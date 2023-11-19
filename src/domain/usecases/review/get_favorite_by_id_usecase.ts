import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';

export class GetFavoriteByIdUseCase implements IBaseUseCase<FavoriteEntity> {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(
    id: string,
    relation?: FindOptionsRelations<FavoriteEntity>,
    select?: FindOptionsSelect<FavoriteEntity>,
  ): Promise<FavoriteEntity> {
    return this.favoriteRepository.findById(id, relation, select);
  }
}
