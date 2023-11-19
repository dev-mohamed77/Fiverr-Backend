import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';

export class DeleteFavoriteUseCase implements IBaseUseCase<boolean> {
  constructor(private favoriteRepository: IFavoriteRepository) {}

  execute(id: string): Promise<boolean> {
    return this.favoriteRepository.delete(id);
  }
}
