import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { FavoriteRepositoryImp } from '../../infra/repositories/favorite.repositoy';
import { CreateFavoriteUseCase } from '../../domain/usecases/favorite/create_favorite_usecase';
import { IFavoriteRepository } from '../../domain/repositories/favorite.repository';
import { GetFavoriteByIdUseCase } from '../../domain/usecases/favorite/get_favorite_by_id_usecase';
import { GetFavoritesUseCase } from '../../domain/usecases/favorite/get_favorites_usecase';
import { GetOneFavoriteUseCase } from '../../domain/usecases/favorite/get_one_favorite_usecase';
import { GetManyFavoritesUseCase } from '../../domain/usecases/favorite/get_many_favorites_usecase';
import { UpdateFavoriteUseCase } from '../../domain/usecases/favorite/update_favorite_usecase';
import { DeleteOneFavoriteUseCase } from '../../domain/usecases/favorite/delete_one_favorite_usecase';
import { DeleteFavoriteUseCase } from '../../domain/usecases/favorite/delete_favorite_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from '../../infra/models/favorite.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), UserModule],
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    {
      provide: FavoriteRepositoryImp,
      useClass: FavoriteRepositoryImp,
    },
    {
      provide: CreateFavoriteUseCase,
      useFactory: (favoriteRepo: IFavoriteRepository) => {
        return new CreateFavoriteUseCase(favoriteRepo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: GetFavoriteByIdUseCase,
      useFactory: (favoriteRepo: IFavoriteRepository) => {
        return new GetFavoriteByIdUseCase(favoriteRepo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: GetFavoritesUseCase,
      useFactory: (favoriteRepo: IFavoriteRepository) => {
        return new GetFavoritesUseCase(favoriteRepo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: GetOneFavoriteUseCase,
      useFactory: (favoriteRepo: IFavoriteRepository) => {
        return new GetOneFavoriteUseCase(favoriteRepo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: GetManyFavoritesUseCase,
      useFactory: (favoriteRepo: IFavoriteRepository) => {
        return new GetManyFavoritesUseCase(favoriteRepo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: UpdateFavoriteUseCase,
      useFactory: (favoriteRepo: IFavoriteRepository) => {
        return new UpdateFavoriteUseCase(favoriteRepo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: DeleteOneFavoriteUseCase,
      useFactory: (favoriteRepo: IFavoriteRepository) => {
        return new DeleteOneFavoriteUseCase(favoriteRepo);
      },
      inject: [FavoriteRepositoryImp],
    },
    {
      provide: DeleteFavoriteUseCase,
      useFactory: (favoriteRepo: IFavoriteRepository) => {
        return new DeleteFavoriteUseCase(favoriteRepo);
      },
      inject: [FavoriteRepositoryImp],
    },
  ],
})
export class FavoriteModule {}
