import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { CreateConversationUseCase } from 'src/domain/usecases/conversation/create_conversation_usecase';
import { DeleteConversationUseCase } from 'src/domain/usecases/conversation/delete_conversation_usecase';
import { DeleteOneConversationUseCase } from 'src/domain/usecases/conversation/delete_one_conversation_usecase';
import { GetConversationByIdUseCase } from 'src/domain/usecases/conversation/get_conversation_by_id_usecase';
import { GetConversationsUseCase } from 'src/domain/usecases/conversation/get_conversations_usecase';
import { GetManyConversationsUseCase } from 'src/domain/usecases/conversation/get_many_conversations_usecase';
import { GetOneConversationUseCase } from 'src/domain/usecases/conversation/get_one_conversation_usecase';
import { UpdateConversationUseCase } from 'src/domain/usecases/conversation/update_conversation_usecase';

@Injectable()
export class ConversationService {
  constructor(
    private createConversationUseCase: CreateConversationUseCase,
    private getConversationsUseCase: GetConversationsUseCase,
    private getConversationByIdUseCase: GetConversationByIdUseCase,
    private getOneConversationUseCase: GetOneConversationUseCase,
    private getManyConversationsUseCase: GetManyConversationsUseCase,
    private updateConversationUseCase: UpdateConversationUseCase,
    private deleteConversationUseCase: DeleteConversationUseCase,
    private deleteOneConversationUseCase: DeleteOneConversationUseCase,
  ) {}

  createConversationService(param: ConversationEntity) {
    return this.createConversationUseCase.execute(param);
  }

  getConversationsService(
    option: FindAllOptionTypOrmModel<ConversationEntity>,
  ) {
    return this.getConversationsUseCase.execute(option);
  }

  async getConversationByIdService(
    option: FindOneByIDOptionTypeOrmModel<ConversationEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.getConversationByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Conversation ${option.id} is not exist`);
    }

    return result;
  }

  async getOneConversationService(
    option: FindOneOptionTypeOrmModel<ConversationEntity>,
  ) {
    const result = await this.getOneConversationUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Conversation is not exist`);
    }

    return result;
  }

  getManyConversationsService(
    option: FindAllOptionTypOrmModel<ConversationEntity>,
  ) {
    return this.getManyConversationsUseCase.execute(option);
  }

  async updateConversationService(
    option: UpdateOptionTypeOrmModel<ConversationEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.updateConversationUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Conversation ${option.id} is not exist`);
    }

    return result;
  }

  async deleteConversationService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }

    const result = await this.deleteConversationUseCase.execute(id);

    if (!result) {
      throw new BadRequestException(`Conversation ${id} is not exist`);
    }

    return result;
  }

  async deleteOneConversationService(filter: Partial<ConversationEntity>) {
    const result = await this.deleteOneConversationUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Conversation is not exist`);
    }

    return result;
  }
}
