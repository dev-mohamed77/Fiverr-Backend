import { FindAllOptionBase } from 'src/application/core/model/option_base_model';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { GigEntity } from 'src/domain/entities/gig.entity';
import { IGigRepository } from 'src/domain/repositories/gig.repository';

export class GetManyGigsUseCase implements IBaseUseCase<[GigEntity[], number]> {
  constructor(private gigRepository: IGigRepository) {}

  execute(option: FindAllOptionBase): Promise<[GigEntity[], number]> {
    return this.gigRepository.findMany(option);
  }
}
