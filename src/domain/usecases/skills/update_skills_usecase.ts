import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { updateOptionBase } from 'src/application/core/model/option_base_model';

export class UpdateSkillsUseCase implements IBaseUseCase<SkillsEntity> {
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(option: updateOptionBase<SkillsEntity>): Promise<SkillsEntity> {
    return this.skillsRepository.update(option);
  }
}
