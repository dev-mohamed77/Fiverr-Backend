import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneOptionBase } from 'src/application/core/model/option_base_model';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { IConversationRepository } from 'src/domain/repositories/conversation.repository';

export class GetOneConversationUseCase
  implements IBaseUseCase<ConversationEntity>
{
  constructor(private conversationRepository: IConversationRepository) {}

  execute(
    option: FindOneOptionBase<ConversationEntity>,
  ): Promise<ConversationEntity> {
    return this.conversationRepository.findOne(option);
  }
}
