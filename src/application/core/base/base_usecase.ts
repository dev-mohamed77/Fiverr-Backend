import BaseEntity from './base_entity';

export interface IBaseUseCase<T> {
  execute(...args: any[]): Promise<T>;
}
