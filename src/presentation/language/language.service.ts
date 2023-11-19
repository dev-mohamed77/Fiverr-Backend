import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationModel } from '../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { CreateLanguageUseCase } from 'src/domain/usecases/language/create_language_usecase';
import { GetLanguagesUseCase } from 'src/domain/usecases/language/get_language_usecase';
import { GetManyLanguagesUseCase } from 'src/domain/usecases/language/get_many_language_usecase';
import { GetLanguageByIdUseCase } from 'src/domain/usecases/language/get_language_by_id_usecase';
import { GetOneLanguageUseCase } from 'src/domain/usecases/language/get_one_language_usecase';
import { UpdateLanguageUseCase } from 'src/domain/usecases/language/update_language_usecase';
import { DeleteLanguageUseCase } from 'src/domain/usecases/language/delete_language_usecase';
import { DeleteOneLanguageUseCase } from 'src/domain/usecases/language/delete_one_language_usecase';
import { LanguageEntity } from 'src/domain/entities/language.entity';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';

@Injectable()
export class LanguageService {
  constructor(
    private createLanguageUseCase: CreateLanguageUseCase,
    private getLanguagesUseCase: GetLanguagesUseCase,
    private getManyLanguagesUseCase: GetManyLanguagesUseCase,
    private getLanguageByIdUseCase: GetLanguageByIdUseCase,
    private getOneLanguageUseCase: GetOneLanguageUseCase,
    private updateLanguageUseCase: UpdateLanguageUseCase,
    private deleteLanguageUseCase: DeleteLanguageUseCase,
    private deleteOneLanguageUseCase: DeleteOneLanguageUseCase,
  ) {}

  createLanguageService(params: LanguageEntity) {
    return this.createLanguageUseCase.execute(params);
  }

  getLanguagesService(option: FindAllOptionTypOrmModel<LanguageEntity>) {
    return this.getLanguagesUseCase.execute(option);
  }

  getManyLanguagesService(option: FindAllOptionTypOrmModel<LanguageEntity>) {
    return this.getManyLanguagesUseCase.execute(option);
  }

  async getLanguageByIdService(
    option: FindOneByIDOptionTypeOrmModel<LanguageEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.getLanguageByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Language ${option.id} is not exist`);
    }

    return result;
  }

  async getOneLanguageService(
    option: FindOneOptionTypeOrmModel<LanguageEntity>,
  ) {
    const result = await this.getOneLanguageUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Language is not exist`);
    }

    return result;
  }

  async updateLanguageService(
    option: UpdateOptionTypeOrmModel<LanguageEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.updateLanguageUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Language ${option.id} is not exist`);
    }

    return result;
  }

  async deleteLanguageService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.deleteLanguageUseCase.execute(id);
    if (!result) {
      throw new BadRequestException(`Language ${id} is not exist`);
    }

    return result;
  }

  async deleteOneLanguageService(filter: Partial<LanguageEntity>) {
    const result = await this.deleteOneLanguageUseCase.execute(filter);
    if (!result) {
      throw new BadRequestException(`Language is not exist`);
    }

    return result;
  }
}
