import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IMessageRepository } from 'src/domain/repositories/message.repository';

export class DeleteMessageUseCase implements IBaseUseCase<boolean> {
  constructor(private messageRepository: IMessageRepository) {}

  execute(id: string): Promise<boolean> {
    return this.messageRepository.delete(id);
  }
}
