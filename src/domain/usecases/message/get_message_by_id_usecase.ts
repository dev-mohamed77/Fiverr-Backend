import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';
import { MessageEntity } from 'src/domain/entities/message.entity';
import { IMessageRepository } from 'src/domain/repositories/message.repository';

export class GetMessageByIdUseCase implements IBaseUseCase<MessageEntity> {
  constructor(private messageRepository: IMessageRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<MessageEntity> {
    return this.messageRepository.findById(option);
  }
}
