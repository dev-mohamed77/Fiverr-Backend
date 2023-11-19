import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';

export class DeleteOneFavoriteUseCase implements IBaseUseCase<boolean> {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(filter: Partial<FavoriteEntity>): Promise<boolean> {
    return this.favoriteRepository.deleteOne(filter);
  }
}
