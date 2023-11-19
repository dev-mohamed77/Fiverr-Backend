import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';

export class DeleteOneSkillsUseCase implements IBaseUseCase<boolean> {
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(filter: Partial<SkillsEntity>): Promise<boolean> {
    return this.skillsRepository.deleteOne(filter);
  }
}
