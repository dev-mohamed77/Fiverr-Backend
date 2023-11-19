import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import SellerEntity from '../../entities/seller.entity';
import { ISellerRepository } from '../../repositories/seller.repository';

export class UpdateSellerUseCase implements IBaseUseCase<SellerEntity> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(id: string, params: SellerEntity): Promise<SellerEntity> {
    return this.sellerRepository.update(id, params);
  }
}
