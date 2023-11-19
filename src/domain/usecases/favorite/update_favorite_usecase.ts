import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { updateOptionBase } from 'src/application/core/model/option_base_model';

export class UpdateFavoriteUseCase implements IBaseUseCase<FavoriteEntity> {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(option: updateOptionBase<FavoriteEntity>): Promise<FavoriteEntity> {
    return this.favoriteRepository.update(option);
  }
}
