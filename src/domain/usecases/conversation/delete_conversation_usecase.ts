import { IFavoriteRepository } from 'src/domain/repositories/favorite.repository';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IConversationRepository } from 'src/domain/repositories/conversation.repository';

export class DeleteConversationUseCase implements IBaseUseCase<boolean> {
  constructor(private conversationRepository: IConversationRepository) {}

  execute(id: string): Promise<boolean> {
    return this.conversationRepository.delete(id);
  }
}
