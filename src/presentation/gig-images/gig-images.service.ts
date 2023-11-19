import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationModel } from '../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { CreateGigImageUseCase } from 'src/domain/usecases/gig_image/create_gig_image_usecase';
import { GetGigImagesUseCase } from 'src/domain/usecases/gig_image/get_gig_images_usecase';
import { GetManyGigImagesUseCase } from 'src/domain/usecases/gig_image/get_many_gig_images_usecase';
import { GetGigImageByIdUseCase } from 'src/domain/usecases/gig_image/get_gig_image_by_id_usecase';
import { GetOneGigImageUseCase } from 'src/domain/usecases/gig_image/get_one_get_image_usecase';
import { UpdateGigImageUseCase } from 'src/domain/usecases/gig_image/update_gig_image_usecase';
import { DeleteGigImageUseCase } from 'src/domain/usecases/gig_image/delete_gig_image_usecase';
import { DeleteOneGigImageUseCase } from 'src/domain/usecases/gig_image/delete_one_gig_image_usecase';
import { GigImageEntity } from 'src/domain/entities/gig_image.entity';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';

@Injectable()
export class GigImagesService {
  constructor(
    private createGigImageUseCase: CreateGigImageUseCase,
    private getGigImagesUseCase: GetGigImagesUseCase,
    private getManyGigImagesUseCase: GetManyGigImagesUseCase,
    private getGigImageByIdUseCase: GetGigImageByIdUseCase,
    private getOneGigImageUseCase: GetOneGigImageUseCase,
    private updateGigImageUseCase: UpdateGigImageUseCase,
    private deleteGigImageUseCase: DeleteGigImageUseCase,
    private deleteOneGigImageUseCase: DeleteOneGigImageUseCase,
  ) {}

  createGigImageService(params: GigImageEntity) {
    return this.createGigImageUseCase.execute(params);
  }

  getGigImagesService(option: FindAllOptionTypOrmModel<GigImageEntity>) {
    return this.getGigImagesUseCase.execute(option);
  }

  getManyGigImagesService(option: FindAllOptionTypOrmModel<GigImageEntity>) {
    return this.getManyGigImagesUseCase.execute(option);
  }

  async getGigImageByIdService(
    option: FindOneByIDOptionTypeOrmModel<GigImageEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.getGigImageByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`GigImage ${option.id} is not exist`);
    }

    return result;
  }

  async getOneGigImageService(
    option: FindOneOptionTypeOrmModel<GigImageEntity>,
  ) {
    const result = await this.getOneGigImageUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`GigImage is not exist`);
    }

    return result;
  }

  async updateGigImageService(
    option: UpdateOptionTypeOrmModel<GigImageEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.updateGigImageUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`GigImage ${option.id} is not exist`);
    }

    return result;
  }

  async deleteGigImageService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.deleteGigImageUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(`GigImage ${id} is not exist`);
    }

    return result;
  }

  async deleteOneGigImageService(filter: Partial<GigImageEntity>) {
    const result = await this.deleteOneGigImageUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`GigImage is not exist`);
    }

    return result;
  }
}
