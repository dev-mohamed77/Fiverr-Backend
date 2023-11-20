import IBaseRepository from 'src/application/core/base/base_repository';
import { ConversationEntity } from '../entities/conversation.entity';

export abstract class IConversationRepository extends IBaseRepository<ConversationEntity> {}
