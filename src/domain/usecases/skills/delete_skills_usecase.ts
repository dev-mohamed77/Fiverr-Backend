import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { ISkillsRepository } from '../../repositories/skilles.repository';

export class DeleteSkillsUseCase implements IBaseUseCase<boolean> {
  constructor(private skillsRepository: ISkillsRepository) {}

  execute(id: string): Promise<boolean> {
    return this.skillsRepository.delete(id);
  }
}
