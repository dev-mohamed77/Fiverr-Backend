import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISellerRepository } from '../../repositories/seller.repository';

export class DeleteSellerUseCase implements IBaseUseCase<boolean> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(id: string): Promise<boolean> {
    return this.sellerRepository.delete(id);
  }
}
