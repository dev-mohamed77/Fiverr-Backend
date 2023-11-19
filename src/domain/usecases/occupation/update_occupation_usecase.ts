import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { LanguageEntity } from '../../entities/language.entity';
import { ILanguageRepository } from '../../repositories/language.repository';

export class UpdateLanguageUseCase implements IBaseUseCase<LanguageEntity> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(id: string, params: LanguageEntity): Promise<LanguageEntity> {
    return this.languageRepository.update(id, params);
  }
}
