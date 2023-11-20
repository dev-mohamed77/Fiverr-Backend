import { IConversationRepository } from 'src/domain/repositories/conversation.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';

export class GetConversationByIdUseCase
  implements IBaseUseCase<ConversationEntity>
{
  constructor(private conversationRepository: IConversationRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<ConversationEntity> {
    return this.conversationRepository.findById(option);
  }
}
