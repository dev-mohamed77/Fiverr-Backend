import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { GigEntity } from 'src/domain/entities/gig.entity';
import { IGigRepository } from 'src/domain/repositories/gig.repository';
import { FindOneOptionBase } from 'src/application/core/model/option_base_model';

export class GetOneGigUseCase implements IBaseUseCase<GigEntity> {
  constructor(private gigRepository: IGigRepository) {}

  execute(option: FindOneOptionBase<GigEntity>): Promise<GigEntity> {
    return this.gigRepository.findOne(option);
  }
}
