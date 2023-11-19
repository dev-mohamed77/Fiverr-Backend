import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { LanguageEntity } from '../../entities/language.entity';
import { ILanguageRepository } from '../../repositories/language.repository';

export class GetLanguageByIdUseCase implements IBaseUseCase<LanguageEntity> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(
    id: string,
    relation?: FindOptionsRelations<LanguageEntity>,
  ): Promise<LanguageEntity> {
    return this.languageRepository.findById(id, relation);
  }
}
