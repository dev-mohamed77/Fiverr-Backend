import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationModel } from '../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { SkillsEntity } from 'src/domain/entities/skills.entity';
import { CreateSkillsUseCase } from 'src/domain/usecases/skills/create_skills_usecase';
import { GetSkillsUseCase } from 'src/domain/usecases/skills/get_skills_usecase';
import { GetManySkillsUseCase } from 'src/domain/usecases/skills/get_many_skills_usecase';
import { GetSkillsByIdUseCase } from 'src/domain/usecases/skills/get_skills_by_id_usecase';
import { GetOneSkillsUseCase } from 'src/domain/usecases/skills/get_one_skills_usecase';
import { UpdateSkillsUseCase } from 'src/domain/usecases/skills/update_skills_usecase';
import { DeleteSkillsUseCase } from 'src/domain/usecases/skills/delete_skills_usecase';
import { DeleteOneSkillsUseCase } from 'src/domain/usecases/skills/delete_one_skills_usecase';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';

@Injectable()
export class SkillsService {
  constructor(
    private createSkillsUseCase: CreateSkillsUseCase,
    private getSkillsUseCase: GetSkillsUseCase,
    private getManySkillsUseCase: GetManySkillsUseCase,
    private getSkillsByIdUseCase: GetSkillsByIdUseCase,
    private getOneSkillsUseCase: GetOneSkillsUseCase,
    private updateSkillsUseCase: UpdateSkillsUseCase,
    private deleteSkillsUseCase: DeleteSkillsUseCase,
    private deleteOneSkillsUseCase: DeleteOneSkillsUseCase,
  ) {}

  createSkillsService(params: SkillsEntity) {
    return this.createSkillsUseCase.execute(params);
  }

  getSkillsService(option: FindAllOptionTypOrmModel<SkillsEntity>) {
    return this.getSkillsUseCase.execute(option);
  }

  getManySkillsService(option: FindAllOptionTypOrmModel<SkillsEntity>) {
    return this.getManySkillsUseCase.execute(option);
  }

  async getSkillsByIdService(
    option: FindOneByIDOptionTypeOrmModel<SkillsEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.getSkillsByIdUseCase.execute(option);
    if (!result) {
      throw new BadRequestException(`Skill ${option.id} is not exist`);
    }

    return result;
  }

  async getOneSkillsService(option: FindOneOptionTypeOrmModel<SkillsEntity>) {
    const result = await this.getOneSkillsUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Skill is not exist`);
    }

    return result;
  }

  async updateSkillsService(option: UpdateOptionTypeOrmModel<SkillsEntity>) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.updateSkillsUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Skill ${option.id} is not exist`);
    }

    return result;
  }

  async deleteSkillsService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.deleteSkillsUseCase.execute(id);
    if (!result) {
      throw new BadRequestException(`Skill ${id} is not exist`);
    }

    return result;
  }

  async deleteOneSkillsService(filter: Partial<SkillsEntity>) {
    const result = await this.deleteOneSkillsUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Skill is not exist`);
    }

    return result;
  }
}
