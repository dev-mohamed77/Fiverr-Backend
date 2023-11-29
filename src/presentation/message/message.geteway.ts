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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGeteway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private messageService: MessageService,
    private conversationService: ConversationService,
  ) {}

  private readonly onlineUsers: Map<string, string> = new Map();

  handleConnection(client: Socket, ...args: any[]) {
    // let userId = client.handshake.query.userId;
    // console.log(`connect ==============> ${client.id}`);
    // client.on('onlineUsers', (_) => {
    //   console.log('a user ' + userId + ' connected');
    //   this.onlineUsers[client.id] = userId;
    // });
    // // send all active users to new user
    // client.emit('get-onlineUsers', this.onlineUsers);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnect ==============> ${client.id}`);
    // delete this.onlineUsers[client.id];

    // // send all active users to new user
    // client.emit('get-onlineUsers', this.onlineUsers);
  }

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

    console.log(`Seller ==========>>>> ${createMessageDto.seller}`);
    console.log(`User ==========>>>> ${createMessageDto.user}`);
    console.log(`sender ==========>>>> ${createMessageDto.sender}`);
    console.log(`message ==========>>>> ${createMessageDto.message}`);
    console.log(`conversation ==========>>>> ${createMessageDto.conversation}`);

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

    console.log(`Seller ==========>>>> ${message.seller}`);
    console.log(`User ==========>>>> ${message.user}`);
    console.log(`sender ==========>>>> ${message.sender}`);
    console.log(`message ==========>>>> ${message.message}`);
    console.log(`conversation ==========>>>> ${message.conversation}`);

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
