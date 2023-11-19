// import { PaginationModel } from '../model/pagination_model';
// import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
// import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
// import { IBaseUseCase } from './base_usecase';
// import BaseEntity from './base_entity';
// import { GigEntity } from '../../../domain/entities/gig.entity';
// import { CreateGigUseCase } from '../../../domain/usecases/gig/create_gig_usecase';
// import SellerEntity from '../../../domain/entities/seller.entity';
//
// export abstract class BaseService<T extends BaseEntity> {
//   abstract createService(...arg: any[]): Promise<T>;
//
//   abstract getAllService(...arg: any[]): Promise<[T[], number]>;
//
//   abstract getManyService(...arg: any[]): Promise<T[]>;
//
//   abstract getByIdService(...arg: any[]): Promise<T>;
//
//   abstract getOneService(...arg: any[]): Promise<T>;
//
//   abstract updateService(...arg: any[]): Promise<T>;
//
//   abstract deleteService(...arg: any[]): Promise<true>;
//
//   abstract deleteOneService(...arg: any[]): Promise<true>;
// }
//
// export abstract class BaseTypeOrmService<
//   T extends BaseEntity,
// > extends BaseService<T> {
//   constructor(public createUseCase: IBaseUseCase<T>) {
//     super();
//   }
//
//   createService(params: T): Promise<T> {
//     return this.createUseCase.execute(params);
//   }
//
//   abstract getAllService(
//     pagination: PaginationModel,
//     relation?: FindOptionsRelations<T>,
//   ): Promise<[T[], number]>;
//
//   abstract getManyService(
//     filter: Partial<T>,
//     pagination: PaginationModel,
//     relation: FindOptionsRelations<T>,
//     select?: FindOptionsSelect<T>,
//   ): Promise<T[]>;
//
//   abstract getByIdService(
//     id: string,
//     relation?: FindOptionsRelations<T>,
//     select?: FindOptionsSelect<T>,
//   ): Promise<T>;
//
//   abstract getOneService(
//     filter: Partial<T>,
//     relation?: FindOptionsRelations<T>,
//     select?: FindOptionsSelect<T>,
//   ): Promise<T>;
//
//   abstract updateService(
//     id: string,
//     params: Partial<T>,
//     relation?: FindOptionsRelations<T>,
//     select?: FindOptionsSelect<T>,
//   ): Promise<T>;
//
//   abstract deleteService(id: string): Promise<true>;
//
//   abstract deleteOneService(filter: Partial<T>): Promise<true>;
// }
//
// class Demo extends BaseTypeOrmService<SellerEntity> {
//   constructor(private createGigUseCase: CreateGigUseCase) {
//     super(createGigUseCase);
//   }
//
//   deleteOneService(arg: any): Promise<true> {
//     return Promise.resolve(true);
//   }
//
//   deleteService(arg: any): Promise<true> {
//     return Promise.resolve(true);
//   }
//
//   getAllService(arg: any): Promise<[GigEntity[], number]> {
//     return Promise.resolve([[], 0]);
//   }
//
//   getByIdService(arg: any): Promise<GigEntity> {
//     return Promise.resolve(undefined);
//   }
//
//   getManyService(arg: any): Promise<GigEntity[]> {
//     return Promise.resolve([]);
//   }
//
//   getOneService(arg: any): Promise<GigEntity> {
//     return Promise.resolve(undefined);
//   }
//
//   updateService(arg: any): Promise<GigEntity> {
//     return Promise.resolve(undefined);
//   }
// }
