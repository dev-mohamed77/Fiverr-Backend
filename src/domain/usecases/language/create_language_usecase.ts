import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISellerRepository } from '../../repositories/seller.repository';
import SellerEntity from '../../entities/seller.entity';

export class CreateSellerUseCase implements IBaseUseCase<SellerEntity> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(params: SellerEntity): Promise<SellerEntity> {
    return this.sellerRepository.create(params);
  }
}
