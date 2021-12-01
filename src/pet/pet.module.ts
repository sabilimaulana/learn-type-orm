import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validPetMiddleware } from 'src/middleware/validPet.middleware';
import { UserModule } from 'src/user/user.module';
import { PetController } from './pet.controller';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), UserModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validPetMiddleware)
      .forRoutes({ path: 'pets/:petId', method: RequestMethod.GET });
    consumer
      .apply(validPetMiddleware)
      .forRoutes({ path: 'pets/:petId', method: RequestMethod.PUT });
    consumer
      .apply(validPetMiddleware)
      .forRoutes({ path: 'pets/:petId', method: RequestMethod.DELETE });
  }
}
