import IBaseRepository from '../../application/core/base/base_repository';
import { FavoriteEntity } from '../entities/favorite.entity';

export abstract class IFavoriteRepository extends IBaseRepository<FavoriteEntity> {}
