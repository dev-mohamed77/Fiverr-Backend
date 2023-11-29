import { Injectable } from '@nestjs/common';
import BaseEntity from './base_entity';
import IBaseRepository from './base_repository';
import { PaginationModel } from '../model/pagination_model';
import { In, Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from '../model/options_typeorm_model';

export abstract class BaseTypeOrmRepository<
  T extends BaseEntity,
> extends IBaseRepository<T> {
  abstract findByIds(ids: string[]): Promise<T[]>;
}

@Injectable()
export abstract class BaseTypeOrmDataSource<T extends BaseEntity>
  implements BaseTypeOrmRepository<T>
{
  constructor(public repository: Repository<T>) {}

  create(params: T): Promise<T> {
    return this.repository.save(params, {});
  }

  findAll(option: FindAllOptionTypOrmModel<T>): Promise<[T[], number]> {
    const page = (Math.abs(option.pagination.page) || 1) - 1;
    const limit = Math.abs(option.pagination.limit) || 10;

    const skip = page * limit;

    return this.repository.findAndCount({
      where: option.filter,
      take: limit,
      skip: skip,
      relations: option.relation,
      select: option.select,
      order: option.order,
    });
  }

  async findById(option: FindOneByIDOptionTypeOrmModel<T>): Promise<T> {
    const result = await this.repository.findOne({
      where: { id: option.id } as FindOptionsWhere<T>,
      relations: option.relation,
      select: option.select,
    });

    return result;
  }

  async findByIds(ids: string[]): Promise<T[]> {
    const result = await this.repository.findBy({
      id: In(ids),
    } as FindOptionsWhere<T>);

    return result;
  }

  findMany(option: FindAllOptionTypOrmModel<T>): Promise<[T[], number]> {
    const page = (Math.abs(option.pagination.page) || 1) - 1;
    const limit = Math.abs(option.pagination.limit) || 10;

    const skip = page * limit;

    return this.repository.findAndCount({
      where: option.filter,
      take: limit,
      skip: skip,
      relations: option.relation,
      select: option.select,
      order: option.order,
    });
  }

  findOne(option: FindOneOptionTypeOrmModel<T>): Promise<T> {
    return this.repository.findOne({
      where: option.params as FindOptionsWhere<T>,
      relations: option.relation,
      select: option.select,
    });
  }

  async update(option: UpdateOptionTypeOrmModel<T>): Promise<T> {
    await this.repository.update(
      option.id,
      option.params as QueryDeepPartialEntity<T>,
    );

    return this.repository.findOne({
      where: { id: option.id as any },
      relations: option.relation,
      select: option.select,
    });
  }

  async delete(id: any): Promise<boolean> {
    const isExisting = await this.repository.findOneBy({ id: id });
    if (isExisting) {
      await this.repository.delete(id);
      return true;
    } else {
      return false;
    }
  }

  async deleteOne(filter: Partial<T>): Promise<boolean> {
    const isExisting = await this.repository.findOne({
      where: filter as FindOptionsWhere<T>,
    });

    if (isExisting) {
      await this.repository.delete(isExisting.id);
      return true;
    } else {
      return false;
    }
  }
}
