import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISellerRepository } from '../../repositories/seller.repository';
import SellerEntity from '../../entities/seller.entity';

export class DeleteOneSellerUseCase implements IBaseUseCase<boolean> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(filter: Partial<SellerEntity>): Promise<boolean> {
    return this.sellerRepository.deleteOne(filter);
  }
}
