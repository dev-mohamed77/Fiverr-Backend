import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';

export class GetSkillsByIdUseCase implements IBaseUseCase<SkillsEntity> {
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<SkillsEntity> {
    return this.skillsRepository.findById(option);
  }
}
