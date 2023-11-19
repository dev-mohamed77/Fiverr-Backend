import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';
import { PaginationModel } from 'src/application/core/model/pagination_model';
import { OccupationEntity } from 'src/domain/entities/occupation.entity';
import { CreateOccupationUseCase } from 'src/domain/usecases/occupation/create_occupation_usecase';
import { DeleteOccupationUseCase } from 'src/domain/usecases/occupation/delete_occupation_usecase';
import { DeleteOneOccupationUseCase } from 'src/domain/usecases/occupation/delete_one_occupation_usecase';
import { GetManyOccupationUseCase } from 'src/domain/usecases/occupation/get_many_occupation_usecase';
import { GetOccupationByIdUseCase } from 'src/domain/usecases/occupation/get_occupation_by_id_usecase';
import { GetOccupationsUseCase } from 'src/domain/usecases/occupation/get_occupation_usecase';
import { GetOneOccupationUseCase } from 'src/domain/usecases/occupation/get_one_occupation_usecase';
import { UpdateOccupationUseCase } from 'src/domain/usecases/occupation/update_occupation_usecase';
import { FindOptionsRelations } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

@Injectable()
export class OccupationService {
  constructor(
    private createOccupationUseCase: CreateOccupationUseCase,
    private getOccupationsUseCase: GetOccupationsUseCase,
    private getManyOccupationsUseCase: GetManyOccupationUseCase,
    private getOccupationByIdUseCase: GetOccupationByIdUseCase,
    private getOneOccupationUseCase: GetOneOccupationUseCase,
    private updateOccupationUseCase: UpdateOccupationUseCase,
    private deleteOccupationUseCase: DeleteOccupationUseCase,
    private deleteOneOccupationUseCase: DeleteOneOccupationUseCase,
  ) {}

  createOccupationService(params: OccupationEntity) {
    return this.createOccupationUseCase.execute(params);
  }

  getOccupationsService(option: FindAllOptionTypOrmModel<OccupationEntity>) {
    return this.getOccupationsUseCase.execute(option);
  }

  getManyOccupationsService(
    option: FindAllOptionTypOrmModel<OccupationEntity>,
  ) {
    return this.getManyOccupationsUseCase.execute(option);
  }

  async getOccupationByIdService(
    option: FindOneByIDOptionTypeOrmModel<OccupationEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.getOccupationByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Occupation ${option.id} is not exist`);
    }

    return result;
  }

  async getOneOccupationService(
    option: FindOneOptionTypeOrmModel<OccupationEntity>,
  ) {
    const result = await this.getOneOccupationUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Occupation is not exist`);
    }

    return result;
  }

  async updateOccupationService(
    option: UpdateOptionTypeOrmModel<OccupationEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.updateOccupationUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Occupation ${option.id} is not exist`);
    }

    return result;
  }

  async deleteOccupationService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.deleteOccupationUseCase.execute(id);
    if (!result) {
      throw new BadRequestException(`Occupation ${id} is not exist`);
    }

    return result;
  }

  async deleteOneOccupationService(filter: Partial<OccupationEntity>) {
    const result = await this.deleteOneOccupationUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Occupation is not exist`);
    }

    return result;
  }
}
