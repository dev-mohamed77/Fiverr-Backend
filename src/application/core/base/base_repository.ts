import BaseEntity from './base_entity';
import { PaginationModel } from '../model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import {
  FindAllOptionBase,
  FindOneByIdOptionBase,
  FindOneOptionBase,
  updateOptionBase,
} from '../model/option_base_model';

export default abstract class IBaseRepository<T extends BaseEntity> {
  abstract create(params: T): Promise<T>;

  abstract update(option: updateOptionBase<T>): Promise<T>;

  abstract findOne(option: FindOneOptionBase<T>): Promise<T>;

  abstract findById(option: FindOneByIdOptionBase): Promise<T>;

  abstract findAll(option: FindAllOptionBase): Promise<[T[], number]>;

  abstract findMany(option: FindAllOptionBase): Promise<[T[], number]>;

  abstract delete(id: string): Promise<boolean>;

  abstract deleteOne(filter: Partial<T>): Promise<boolean>;
}
