import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { MessageEntity } from 'src/domain/entities/message.entity';
import { IMessageRepository } from 'src/domain/repositories/message.repository';

export class CreateMessageUseCase implements IBaseUseCase<MessageEntity> {
  constructor(private messageRepository: IMessageRepository) {}

  execute(params: MessageEntity): Promise<MessageEntity> {
    return this.messageRepository.create(params);
  }
}
