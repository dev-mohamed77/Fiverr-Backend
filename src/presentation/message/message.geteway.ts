import { MessageService } from './message.service';
import { CreateMessageDto } from 'src/domain/dtos/message/create_message.dto';
import { MessageEntity } from 'src/domain/entities/message.entity';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationService } from '../conversation/conversation.service';
import { CreateRoomDto } from 'src/domain/dtos/message/create_rome.dto';

@WebSocketGateway(Number(process.env.PORT))
export class MessageGeteway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private messageService: MessageService,
    private conversationService: ConversationService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() createRomeDto: CreateRoomDto,
  ) {
    client.join(`${createRomeDto.seller}-${createRomeDto.user}`);
  }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    // add message to message table in database

    const messageEntity = new MessageEntity({
      message: createMessageDto.message,
      sender: createMessageDto.sender,
      conversation: {
        id: createMessageDto.conversation,
      },
      seller: {
        id: createMessageDto.seller,
      },
      user: {
        id: createMessageDto.user,
      },
    });

    const message = await this.messageService.createMessageService(
      messageEntity,
    );

    // event send message to web socket server
    client
      .to(`${createMessageDto.seller}-${createMessageDto.user}`)
      .emit('getMessage', message);

    // update conversation for last message
    await this.conversationService.updateConversationService({
      id: createMessageDto.conversation,
      params: {
        lastMessage: createMessageDto.message,
      },
    });
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('typing', isTyping);
  }
}
