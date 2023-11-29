import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';
import { MessageEntity } from 'src/domain/entities/message.entity';
import { IMessageRepository } from 'src/domain/repositories/message.repository';

export class GetMessagesUseCase
  implements IBaseUseCase<[MessageEntity[], number]>
{
  constructor(private messageRepository: IMessageRepository) {}

  execute(option: FindAllOptionBase): Promise<[MessageEntity[], number]> {
    return this.messageRepository.findAll(option);
  }
}
