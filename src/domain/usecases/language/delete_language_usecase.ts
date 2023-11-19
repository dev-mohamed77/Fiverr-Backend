import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ILanguageRepository } from '../../repositories/language.repository';

export class DeleteLanguageUseCase implements IBaseUseCase<boolean> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(id: string): Promise<boolean> {
    return this.languageRepository.delete(id);
  }
}
