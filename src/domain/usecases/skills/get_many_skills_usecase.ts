import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';
import { SkillsEntity } from '../../entities/skills.entity';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetManySkillsUseCase
  implements IBaseUseCase<[SkillsEntity[], number]>
{
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(option: FindAllOptionBase): Promise<[SkillsEntity[], number]> {
    return this.skillsRepository.findMany(option);
  }
}
