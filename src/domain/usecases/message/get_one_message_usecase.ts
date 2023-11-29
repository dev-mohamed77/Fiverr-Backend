import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneOptionBase } from 'src/application/core/model/option_base_model';
import { MessageEntity } from 'src/domain/entities/message.entity';
import { IMessageRepository } from 'src/domain/repositories/message.repository';

export class GetOneMessageUseCase implements IBaseUseCase<MessageEntity> {
  constructor(private messageRepository: IMessageRepository) {}

  execute(option: FindOneOptionBase<MessageEntity>): Promise<MessageEntity> {
    return this.messageRepository.findOne(option);
  }
}
