import BaseEntity from '../base/base_entity';
import { PaginationModel } from './pagination_model';

export abstract class FindAllOptionBase {
  pagination: PaginationModel;
}

export abstract class FindOneByIdOptionBase {
  id: string;
}

export abstract class FindOneOptionBase<T extends BaseEntity> {
  params: Partial<T>;
}

export abstract class updateOptionBase<
  T extends BaseEntity,
> extends FindOneByIdOptionBase {
  params: Partial<T>;
}

// export interface FindOneByIdOption {
//     id: string;
//   }

//   export type FindOneOptionTypeOrmModel<T> = FindOneByIdOption & {
//     relation?: FindOptionsRelations<T>;
//     select?: FindOptionsSelect<T>;
//   };
