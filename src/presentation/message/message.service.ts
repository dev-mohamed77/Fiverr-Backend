import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';
import { MessageEntity } from 'src/domain/entities/message.entity';
import { CreateMessageUseCase } from 'src/domain/usecases/message/create_message_usecase';
import { DeleteMessageUseCase } from 'src/domain/usecases/message/delete_message_usecase';
import { DeleteOneMessageUseCase } from 'src/domain/usecases/message/delete_one_message_usecase';
import { GetManyMessagesUseCase } from 'src/domain/usecases/message/get_many_message_usecase';
import { GetMessageByIdUseCase } from 'src/domain/usecases/message/get_message_by_id_usecase';
import { GetMessagesUseCase } from 'src/domain/usecases/message/get_message_usecase';
import { GetOneMessageUseCase } from 'src/domain/usecases/message/get_one_message_usecase';
import { UpdateMessageUseCase } from 'src/domain/usecases/message/update_message_usecase';

@Injectable()
export class MessageService {
  constructor(
    private createMessageUseCase: CreateMessageUseCase,
    private getMessagesUseCase: GetMessagesUseCase,
    private getMessageByIdUseCase: GetMessageByIdUseCase,
    private getOneMessageUseCase: GetOneMessageUseCase,
    private getManyMessagesUseCase: GetManyMessagesUseCase,
    private updateMessageUseCase: UpdateMessageUseCase,
    private deleteMessageUseCase: DeleteMessageUseCase,
    private deleteOneMessageUseCase: DeleteOneMessageUseCase,
  ) {}

  async createMessageService(param: MessageEntity) {
    const message = await this.createMessageUseCase.execute(param);

    return await this.getMessageByIdService({
      id: message.id,
      relation: {
        conversation: true,
        seller: true,
        user: true,
      },
      select: {
        conversation: {
          id: true,
        },
        seller: {
          id: true,
          fullName: true,
          displayName: true,
          picture: true,
        },
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }

  getMessagesService(option: FindAllOptionTypOrmModel<MessageEntity>) {
    return this.getMessagesUseCase.execute(option);
  }

  async getMessageByIdService(
    option: FindOneByIDOptionTypeOrmModel<MessageEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.getMessageByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Message ${option.id} is not exist`);
    }

    return result;
  }

  async getOneMessageService(option: FindOneOptionTypeOrmModel<MessageEntity>) {
    const result = await this.getOneMessageUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Message is not exist`);
    }

    return result;
  }

  getManyMessagesService(option: FindAllOptionTypOrmModel<MessageEntity>) {
    return this.getManyMessagesUseCase.execute(option);
  }

  async updateMessageService(option: UpdateOptionTypeOrmModel<MessageEntity>) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.updateMessageUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Message ${option.id} is not exist`);
    }

    return result;
  }

  async deleteMessageService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.deleteMessageUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(`Message ${id} is not exist`);
    }

    return result;
  }

  async deleteOneMessageService(filter: Partial<MessageEntity>) {
    const result = await this.deleteOneMessageUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Message is not exist`);
    }

    return result;
  }
}
