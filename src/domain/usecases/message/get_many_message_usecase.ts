import { FindAllOptionBase } from 'src/application/core/model/option_base_model';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { MessageEntity } from 'src/domain/entities/message.entity';
import { IMessageRepository } from 'src/domain/repositories/message.repository';

export class GetManyMessagesUseCase
  implements IBaseUseCase<[MessageEntity[], number]>
{
  constructor(private MessageRepository: IMessageRepository) {}

  execute(option: FindAllOptionBase): Promise<[MessageEntity[], number]> {
    return this.MessageRepository.findMany(option);
  }
}
