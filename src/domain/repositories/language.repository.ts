import IBaseRepository from '../../application/core/base/base_repository';
import { LanguageEntity } from '../entities/language.entity';

export abstract class ILanguageRepository extends IBaseRepository<LanguageEntity> {}
