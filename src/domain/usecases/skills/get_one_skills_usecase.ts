import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOneOptionBase } from 'src/application/core/model/option_base_model';

export class GetOneSkillsUseCase implements IBaseUseCase<SkillsEntity> {
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(option: FindOneOptionBase<SkillsEntity>): Promise<SkillsEntity> {
    return this.skillsRepository.findOne(option);
  }
}
