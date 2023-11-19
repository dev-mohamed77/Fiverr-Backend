import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { ILanguageRepository } from 'src/domain/repositories/language.repository';
import { LanguageRepositoryImp } from 'src/infra/repositories/language.repository';
import { CreateLanguageUseCase } from 'src/domain/usecases/language/create_language_usecase';
import { GetManyLanguagesUseCase } from 'src/domain/usecases/language/get_many_language_usecase';
import { GetLanguageByIdUseCase } from 'src/domain/usecases/language/get_language_by_id_usecase';
import { GetLanguagesUseCase } from 'src/domain/usecases/language/get_language_usecase';
import { GetOneLanguageUseCase } from 'src/domain/usecases/language/get_one_language_usecase';
import { UpdateLanguageUseCase } from 'src/domain/usecases/language/update_language_usecase';
import { DeleteLanguageUseCase } from 'src/domain/usecases/language/delete_language_usecase';
import { DeleteOneLanguageUseCase } from 'src/domain/usecases/language/delete_one_language_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/infra/models/language.model';
import { UserModule } from '../user/user.module';
import { LanguagesSellerController } from './languages_seller.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Language]), UserModule],
  controllers: [LanguageController, LanguagesSellerController],
  exports: [LanguageService],
  providers: [
    LanguageService,
    {
      provide: LanguageRepositoryImp,
      useClass: LanguageRepositoryImp,
    },
    {
      provide: CreateLanguageUseCase,
      useFactory: (languageRepo: ILanguageRepository) => {
        return new CreateLanguageUseCase(languageRepo);
      },
      inject: [LanguageRepositoryImp],
    },
    {
      provide: GetManyLanguagesUseCase,
      useFactory: (languageRepo: ILanguageRepository) => {
        return new GetManyLanguagesUseCase(languageRepo);
      },
      inject: [LanguageRepositoryImp],
    },
    {
      provide: GetLanguageByIdUseCase,
      useFactory: (languageRepo: ILanguageRepository) => {
        return new GetLanguageByIdUseCase(languageRepo);
      },
      inject: [LanguageRepositoryImp],
    },
    {
      provide: GetLanguagesUseCase,
      useFactory: (languageRepo: ILanguageRepository) => {
        return new GetLanguagesUseCase(languageRepo);
      },
      inject: [LanguageRepositoryImp],
    },
    {
      provide: GetOneLanguageUseCase,
      useFactory: (languageRepo: ILanguageRepository) => {
        return new GetOneLanguageUseCase(languageRepo);
      },
      inject: [LanguageRepositoryImp],
    },
    {
      provide: UpdateLanguageUseCase,
      useFactory: (languageRepo: ILanguageRepository) => {
        return new UpdateLanguageUseCase(languageRepo);
      },
      inject: [LanguageRepositoryImp],
    },
    {
      provide: DeleteLanguageUseCase,
      useFactory: (languageRepo: ILanguageRepository) => {
        return new DeleteLanguageUseCase(languageRepo);
      },
      inject: [LanguageRepositoryImp],
    },
    {
      provide: DeleteOneLanguageUseCase,
      useFactory: (languageRepo: ILanguageRepository) => {
        return new DeleteOneLanguageUseCase(languageRepo);
      },
      inject: [LanguageRepositoryImp],
    },
  ],
})
export class LanguageModule {}
