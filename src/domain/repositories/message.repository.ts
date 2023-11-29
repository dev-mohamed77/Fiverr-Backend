import { BaseTypeOrmRepository } from 'src/application/core/base/base_typeorm_data_source';
import { MessageEntity } from '../entities/message.entity';

export abstract class IMessageRepository extends BaseTypeOrmRepository<MessageEntity> {}
