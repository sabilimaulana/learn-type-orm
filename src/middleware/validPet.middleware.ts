import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Pet } from 'src/pet/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class validPetMiddleware implements NestMiddleware {
  constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>) {}

  use(req: Request, res: Response, next: NextFunction) {
    const petId = req.params.petId;

    this.petRepository
      .findOneOrFail(petId)
      .then(() => next())
      .catch(() => {
        const err = new HttpException('Pet not found', 404);
        next(err);
      });
  }
}
