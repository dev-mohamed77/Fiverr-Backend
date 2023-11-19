import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IOccupationRepository } from '../../repositories/occupation.repository';

export class DeleteOccupationUseCase implements IBaseUseCase<boolean> {
  constructor(private occupationRepository: IOccupationRepository) {}

  execute(id: string): Promise<boolean> {
    return this.occupationRepository.delete(id);
  }
}
