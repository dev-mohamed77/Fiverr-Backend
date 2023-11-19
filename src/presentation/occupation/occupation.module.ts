import { Module } from '@nestjs/common';
import { OccupationController } from './occupation.controller';
import { OccupationService } from './occupation.service';
import { OccupationRepositoryImp } from 'src/infra/repositories/occupation.repository';
import { IOccupationRepository } from 'src/domain/repositories/occupation.repository';
import { CreateOccupationUseCase } from 'src/domain/usecases/occupation/create_occupation_usecase';
import { GetManyOccupationUseCase } from 'src/domain/usecases/occupation/get_many_occupation_usecase';
import { GetOccupationByIdUseCase } from 'src/domain/usecases/occupation/get_occupation_by_id_usecase';
import { GetOccupationsUseCase } from 'src/domain/usecases/occupation/get_occupation_usecase';
import { GetOneOccupationUseCase } from 'src/domain/usecases/occupation/get_one_occupation_usecase';
import { UpdateOccupationUseCase } from 'src/domain/usecases/occupation/update_occupation_usecase';
import { DeleteOccupationUseCase } from 'src/domain/usecases/occupation/delete_occupation_usecase';
import { DeleteOneOccupationUseCase } from 'src/domain/usecases/occupation/delete_one_occupation_usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occupation } from 'src/infra/models/occupation.model';
import { UserModule } from '../user/user.module';
import { OccupationSellerController } from './occupation_seller.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Occupation]), UserModule],
  controllers: [OccupationController, OccupationSellerController],
  exports: [OccupationService],
  providers: [
    OccupationService,
    {
      provide: OccupationRepositoryImp,
      useClass: OccupationRepositoryImp,
    },
    {
      provide: CreateOccupationUseCase,
      useFactory: (occupationRepo: IOccupationRepository) => {
        return new CreateOccupationUseCase(occupationRepo);
      },
      inject: [OccupationRepositoryImp],
    },
    {
      provide: GetManyOccupationUseCase,
      useFactory: (occupationRepo: IOccupationRepository) => {
        return new GetManyOccupationUseCase(occupationRepo);
      },
      inject: [OccupationRepositoryImp],
    },
    {
      provide: GetOccupationByIdUseCase,
      useFactory: (occupationRepo: IOccupationRepository) => {
        return new GetOccupationByIdUseCase(occupationRepo);
      },
      inject: [OccupationRepositoryImp],
    },
    {
      provide: GetOccupationsUseCase,
      useFactory: (occupationRepo: IOccupationRepository) => {
        return new GetOccupationsUseCase(occupationRepo);
      },
      inject: [OccupationRepositoryImp],
    },
    {
      provide: GetOneOccupationUseCase,
      useFactory: (occupationRepo: IOccupationRepository) => {
        return new GetOneOccupationUseCase(occupationRepo);
      },
      inject: [OccupationRepositoryImp],
    },
    {
      provide: UpdateOccupationUseCase,
      useFactory: (occupationRepo: IOccupationRepository) => {
        return new UpdateOccupationUseCase(occupationRepo);
      },
      inject: [OccupationRepositoryImp],
    },
    {
      provide: DeleteOccupationUseCase,
      useFactory: (occupationRepo: IOccupationRepository) => {
        return new DeleteOccupationUseCase(occupationRepo);
      },
      inject: [OccupationRepositoryImp],
    },
    {
      provide: DeleteOneOccupationUseCase,
      useFactory: (occupationRepo: IOccupationRepository) => {
        return new DeleteOneOccupationUseCase(occupationRepo);
      },
      inject: [OccupationRepositoryImp],
    },
  ],
})
export class OccupationModule {}
