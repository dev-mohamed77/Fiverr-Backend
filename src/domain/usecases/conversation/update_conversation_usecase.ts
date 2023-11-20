import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { updateOptionBase } from 'src/application/core/model/option_base_model';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { IConversationRepository } from 'src/domain/repositories/conversation.repository';

export class UpdateConversationUseCase
  implements IBaseUseCase<ConversationEntity>
{
  constructor(private conversationRepository: IConversationRepository) {}

  execute(
    option: updateOptionBase<ConversationEntity>,
  ): Promise<ConversationEntity> {
    return this.conversationRepository.update(option);
  }
}
