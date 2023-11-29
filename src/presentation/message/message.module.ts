import { Module } from '@nestjs/common';
import { MessageGeteway } from './message.geteway';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/infra/models/message.mode';
import { MessageRepositoryImp } from 'src/infra/repositories/message.repository';
import { CreateMessageUseCase } from 'src/domain/usecases/message/create_message_usecase';
import { IMessageRepository } from 'src/domain/repositories/message.repository';
import { GetMessageByIdUseCase } from 'src/domain/usecases/message/get_message_by_id_usecase';
import { GetMessagesUseCase } from 'src/domain/usecases/message/get_message_usecase';
import { GetOneMessageUseCase } from 'src/domain/usecases/message/get_one_message_usecase';
import { GetManyMessagesUseCase } from 'src/domain/usecases/message/get_many_message_usecase';
import { UpdateMessageUseCase } from 'src/domain/usecases/message/update_message_usecase';
import { DeleteOneMessageUseCase } from 'src/domain/usecases/message/delete_one_message_usecase';
import { DeleteMessageUseCase } from 'src/domain/usecases/message/delete_message_usecase';
import { UserModule } from '../user/user.module';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageController } from './message.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UserModule,
    ConversationModule,
  ],
  controllers: [MessageController],

  providers: [
    MessageGeteway,
    MessageService,
    {
      useClass: MessageRepositoryImp,
      provide: MessageRepositoryImp,
    },

    {
      provide: CreateMessageUseCase,
      useFactory(repo: IMessageRepository) {
        return new CreateMessageUseCase(repo);
      },
      inject: [MessageRepositoryImp],
    },
    {
      provide: GetMessageByIdUseCase,
      useFactory: (repo: IMessageRepository) => {
        return new GetMessageByIdUseCase(repo);
      },
      inject: [MessageRepositoryImp],
    },
    {
      provide: GetMessagesUseCase,
      useFactory: (repo: IMessageRepository) => {
        return new GetMessagesUseCase(repo);
      },
      inject: [MessageRepositoryImp],
    },
    {
      provide: GetOneMessageUseCase,
      useFactory: (repo: IMessageRepository) => {
        return new GetOneMessageUseCase(repo);
      },
      inject: [MessageRepositoryImp],
    },
    {
      provide: GetManyMessagesUseCase,
      useFactory: (repo: IMessageRepository) => {
        return new GetManyMessagesUseCase(repo);
      },
      inject: [MessageRepositoryImp],
    },
    {
      provide: UpdateMessageUseCase,
      useFactory: (repo: IMessageRepository) => {
        return new UpdateMessageUseCase(repo);
      },
      inject: [MessageRepositoryImp],
    },
    {
      provide: DeleteOneMessageUseCase,
      useFactory: (repo: IMessageRepository) => {
        return new DeleteOneMessageUseCase(repo);
      },
      inject: [MessageRepositoryImp],
    },
    {
      provide: DeleteMessageUseCase,
      useFactory: (repo: IMessageRepository) => {
        return new DeleteMessageUseCase(repo);
      },
      inject: [MessageRepositoryImp],
    },
  ],
})
export class MessageModule {}
