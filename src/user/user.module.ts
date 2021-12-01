import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validUserMiddleware } from 'src/middleware/validUser.middleware';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validUserMiddleware)
      .forRoutes({ path: 'users/:userId', method: RequestMethod.GET });
    consumer
      .apply(validUserMiddleware)
      .forRoutes({ path: 'users/:userId', method: RequestMethod.PUT });
    consumer
      .apply(validUserMiddleware)
      .forRoutes({ path: 'users/:userId', method: RequestMethod.DELETE });
  }
}
