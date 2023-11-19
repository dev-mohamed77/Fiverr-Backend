import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { FavoriteEntity } from 'src/domain/entities/favorite.entity';
import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';

export class GetFavoriteByIdUseCase implements IBaseUseCase<FavoriteEntity> {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<FavoriteEntity> {
    return this.favoriteRepository.findById(option);
  }
}
