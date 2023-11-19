import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';

export class CreateFavoriteUseCase implements IBaseUseCase<FavoriteEntity> {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(params: FavoriteEntity): Promise<FavoriteEntity> {
    return this.favoriteRepository.create(params);
  }
}
