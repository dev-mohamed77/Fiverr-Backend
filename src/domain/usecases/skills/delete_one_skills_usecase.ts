import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { LanguageEntity } from '../../entities/language.entity';
import { IOccupationRepository } from '../../repositories/occupation.repository';

export class DeleteOneOccupationUseCase implements IBaseUseCase<boolean> {
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(filter: Partial<LanguageEntity>): Promise<boolean> {
    return this.occupationRepository.deleteOne(filter);
  }
}
