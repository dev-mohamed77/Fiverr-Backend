import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ILanguageRepository } from '../../repositories/language.repository';
import { LanguageEntity } from '../../entities/language.entity';

export class DeleteOneLanguageUseCase implements IBaseUseCase<boolean> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(filter: Partial<LanguageEntity>): Promise<boolean> {
    return this.languageRepository.deleteOne(filter);
  }
}
