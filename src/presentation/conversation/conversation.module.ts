import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationRepositoryImp } from 'src/infra/repositories/conversation.repository';
import { IConversationRepository } from 'src/domain/repositories/conversation.repository';
import { CreateConversationUseCase } from 'src/domain/usecases/conversation/create_conversation_usecase';
import { GetConversationByIdUseCase } from 'src/domain/usecases/conversation/get_conversation_by_id_usecase';
import { GetConversationsUseCase } from 'src/domain/usecases/conversation/get_conversations_usecase';
import { GetOneConversationUseCase } from 'src/domain/usecases/conversation/get_one_conversation_usecase';
import { GetManyConversationsUseCase } from 'src/domain/usecases/conversation/get_many_conversations_usecase';
import { UpdateConversationUseCase } from 'src/domain/usecases/conversation/update_conversation_usecase';
import { DeleteOneConversationUseCase } from 'src/domain/usecases/conversation/delete_one_conversation_usecase';
import { DeleteConversationUseCase } from 'src/domain/usecases/conversation/delete_conversation_usecase';
import { ConversationUserController } from './conversation_user.controller';
import { ConversationSellerController } from './conversation_seller.controller';
import { Conversation } from 'src/infra/models/conversation.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), UserModule],
  controllers: [
    ConversationController,
    ConversationUserController,
    ConversationSellerController,
  ],
  exports: [ConversationService],
  providers: [
    ConversationService,
    {
      useClass: ConversationRepositoryImp,
      provide: ConversationRepositoryImp,
    },

    {
      provide: CreateConversationUseCase,
      useFactory(repo: IConversationRepository) {
        return new CreateConversationUseCase(repo);
      },
      inject: [ConversationRepositoryImp],
    },
    {
      provide: GetConversationByIdUseCase,
      useFactory: (repo: IConversationRepository) => {
        return new GetConversationByIdUseCase(repo);
      },
      inject: [ConversationRepositoryImp],
    },
    {
      provide: GetConversationsUseCase,
      useFactory: (repo: IConversationRepository) => {
        return new GetConversationsUseCase(repo);
      },
      inject: [ConversationRepositoryImp],
    },
    {
      provide: GetOneConversationUseCase,
      useFactory: (repo: IConversationRepository) => {
        return new GetOneConversationUseCase(repo);
      },
      inject: [ConversationRepositoryImp],
    },
    {
      provide: GetManyConversationsUseCase,
      useFactory: (repo: IConversationRepository) => {
        return new GetManyConversationsUseCase(repo);
      },
      inject: [ConversationRepositoryImp],
    },
    {
      provide: UpdateConversationUseCase,
      useFactory: (repo: IConversationRepository) => {
        return new UpdateConversationUseCase(repo);
      },
      inject: [ConversationRepositoryImp],
    },
    {
      provide: DeleteOneConversationUseCase,
      useFactory: (repo: IConversationRepository) => {
        return new DeleteOneConversationUseCase(repo);
      },
      inject: [ConversationRepositoryImp],
    },
    {
      provide: DeleteConversationUseCase,
      useFactory: (repo: IConversationRepository) => {
        return new DeleteConversationUseCase(repo);
      },
      inject: [ConversationRepositoryImp],
    },
  ],
})
export class ConversationModule {}
