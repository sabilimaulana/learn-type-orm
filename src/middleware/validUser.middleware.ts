import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class validUserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;

    this.userRepository
      .findOneOrFail(userId)
      .then(() => {
        next();
        return;
      })
      .catch(() => {
        const err = new HttpException('User not found', 404);
        next(err);
      });
  }
}
