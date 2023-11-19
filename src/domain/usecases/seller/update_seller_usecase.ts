import { updateOptionBase } from 'src/application/core/model/option_base_model';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import SellerEntity from '../../entities/seller.entity';
import { ISellerRepository } from '../../repositories/seller.repository';

export class UpdateSellerUseCase implements IBaseUseCase<SellerEntity> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(option: updateOptionBase<SellerEntity>): Promise<SellerEntity> {
    return this.sellerRepository.update(option);
  }
}
