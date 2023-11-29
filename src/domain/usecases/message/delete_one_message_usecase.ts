import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IMessageRepository } from 'src/domain/repositories/message.repository';
import { MessageEntity } from 'src/domain/entities/message.entity';

export class DeleteOneMessageUseCase implements IBaseUseCase<boolean> {
  constructor(private messageRepository: IMessageRepository) {}

  execute(filter: Partial<MessageEntity>): Promise<boolean> {
    return this.messageRepository.deleteOne(filter);
  }
}
