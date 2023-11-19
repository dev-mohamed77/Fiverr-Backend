import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGigUseCase } from '../../domain/usecases/gig/create_gig_usecase';
import { GetGigsUseCase } from '../../domain/usecases/gig/get_gigs_usecase';
import { GetOneGigUseCase } from '../../domain/usecases/gig/get_one_gig_usecase';
import { GetGigByIdUseCase } from '../../domain/usecases/gig/get_gig_by_id_usecase';
import { UpdateGigUseCase } from '../../domain/usecases/gig/update_gig_usecase';
import { DeleteGigUseCase } from '../../domain/usecases/gig/delete_gig_usecase';
import { GetManyGigsUseCase } from '../../domain/usecases/gig/get_many_gigs_usecase';
import { PaginationModel } from '../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { GigEntity } from 'src/domain/entities/gig.entity';
import { DeleteOneGigUseCase } from 'src/domain/usecases/gig/delete_one_gig_usecase';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';

@Injectable()
export class GigService {
  constructor(
    private createGigUseCase: CreateGigUseCase,
    private getGigsUseCase: GetGigsUseCase,
    private getManyGigsUseCase: GetManyGigsUseCase,
    private getGigByIdUseCase: GetGigByIdUseCase,
    private getOneGigUseCase: GetOneGigUseCase,
    private updateGigUseCase: UpdateGigUseCase,
    private deleteGigUseCase: DeleteGigUseCase,
    private deleteOneGigUseCase: DeleteOneGigUseCase,
  ) {}

  createGigService(params: GigEntity) {
    return this.createGigUseCase.execute(params);
  }

  getGigsService(option: FindAllOptionTypOrmModel<GigEntity>) {
    return this.getGigsUseCase.execute(option);
  }

  getManyGigsService(option: FindAllOptionTypOrmModel<GigEntity>) {
    return this.getManyGigsUseCase.execute(option);
  }

  async getGigByIdService(option: FindOneByIDOptionTypeOrmModel<GigEntity>) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.getGigByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Gig ${option.id} is not exist`);
    }

    return result;
  }

  async getOneGigService(option: FindOneOptionTypeOrmModel<GigEntity>) {
    const result = await this.getOneGigUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Gig is not exist`);
    }

    return result;
  }

  async updateGigService(option: UpdateOptionTypeOrmModel<GigEntity>) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.updateGigUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Gig ${option.id} is not exist`);
    }

    return result;
  }

  async deleteGigService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.deleteGigUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(`Gig ${id} is not exist`);
    }

    return result;
  }

  async deleteOneGigService(filter: Partial<GigEntity>) {
    const result = await this.deleteOneGigUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Gig is not exist`);
    }

    return result;
  }
}
