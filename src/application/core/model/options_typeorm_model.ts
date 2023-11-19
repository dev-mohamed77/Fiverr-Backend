import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';
import {
  FindAllOptionBase,
  FindOneByIdOptionBase,
  FindOneOptionBase,
  updateOptionBase,
} from './option_base_model';
import BaseEntity from '../base/base_entity';

export class FindAllOptionTypOrmModel<T> extends FindAllOptionBase {
  relation?: FindOptionsRelations<T>;
  select?: FindOptionsSelect<T>;
  filter?: FindOptionsWhere<T>;
  order?: FindOptionsOrder<T>;
}

export class FindOneByIDOptionTypeOrmModel<T> extends FindOneByIdOptionBase {
  relation?: FindOptionsRelations<T>;
  select?: FindOptionsSelect<T>;
}

export class UpdateOptionTypeOrmModel<
  T extends BaseEntity,
> extends updateOptionBase<T> {
  relation?: FindOptionsRelations<T>;
  select?: FindOptionsSelect<T>;
}

export class FindOneOptionTypeOrmModel<
  T extends BaseEntity,
> extends FindOneOptionBase<T> {
  relation?: FindOptionsRelations<T>;
  select?: FindOptionsSelect<T>;
}
