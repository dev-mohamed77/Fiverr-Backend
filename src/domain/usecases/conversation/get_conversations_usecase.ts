import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { IConversationRepository } from 'src/domain/repositories/conversation.repository';

export class GetConversationsUseCase
  implements IBaseUseCase<[ConversationEntity[], number]>
{
  constructor(private conversationRepository: IConversationRepository) {}

  execute(option: FindAllOptionBase): Promise<[ConversationEntity[], number]> {
    return this.conversationRepository.findAll(option);
  }
}
