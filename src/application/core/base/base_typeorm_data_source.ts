import { Injectable } from '@nestjs/common';
import BaseEntity from './base_entity';
import BaseRepository from './base_repository';
import { PaginationModel } from '../model/pagination_model';
import { Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BasePostgresDataSource<T extends BaseEntity>
  implements BaseRepository<T>
{
  constructor(public repository: Repository<T>) {}

  create(params: T): Promise<T> {
    return this.repository.save(params);
  }

  findAll(pagination: PaginationModel): Promise<[T[], number]> {
    return this.repository.findAndCount({
      take: pagination.limit,
      skip: pagination.page,
    });
  }

  async findById(id: string): Promise<T> {
    const result = await this.repository.findOne({
      where: { id: id } as FindOptionsWhere<T>,
    });

    return result;
  }

  findMany(filter: Partial<T>, pagination: PaginationModel): Promise<T[]> {
    return this.repository.find({
      where: filter as FindOptionsWhere<T>,
      take: pagination.limit,
      skip: pagination.page,
    });
  }

  findOne(params: Partial<T>): Promise<T> {
    return this.repository.findOne({ where: params as FindOptionsWhere<T> });
  }

  async update(id: string, params: Partial<T>): Promise<T> {
    const updateData = await this.repository.update(
      id,
      params as QueryDeepPartialEntity<T>,
    );

    return this.repository.findOneBy({ id: updateData.raw[0].id });
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
