import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmDataSource } from 'src/application/core/base/base_typeorm_data_source';
import { MessageEntity } from 'src/domain/entities/message.entity';
import { IMessageRepository } from 'src/domain/repositories/message.repository';
import { Message } from '../models/message.mode';
import { Repository } from 'typeorm';

export class MessageRepositoryImp
  extends BaseTypeOrmDataSource<MessageEntity>
  implements IMessageRepository
{
  constructor(
    @InjectRepository(Message) repository: Repository<MessageEntity>,
  ) {
    super(repository);
  }
}
