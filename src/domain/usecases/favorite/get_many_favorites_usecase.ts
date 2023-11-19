import { FindAllOptionBase } from 'src/application/core/model/option_base_model';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';

export class GetManyFavoritesUseCase
  implements IBaseUseCase<[FavoriteEntity[], number]>
{
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(option: FindAllOptionBase): Promise<[FavoriteEntity[], number]> {
    return this.favoriteRepository.findMany(option);
  }
}
