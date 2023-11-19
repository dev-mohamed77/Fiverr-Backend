import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { FavoriteEntity } from '../../domain/entities/favorite.entity';
import { IFavoriteRepository } from '../../domain/repositories/favorite.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from '../models/favorite.model';
import { Repository } from 'typeorm';

export class FavoriteRepositoryImp
  extends BaseTypeOrmDataSource<FavoriteEntity>
  implements IFavoriteRepository
{
  constructor(
    @InjectRepository(Favorite) repository: Repository<FavoriteEntity>,
  ) {
    super(repository);
  }
}
