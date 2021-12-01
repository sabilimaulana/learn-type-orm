import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['pets'] });
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.pets', 'pet')
        .where('user.id = :id', { id })
        .getOne();

      // const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  createUser(name: string): Promise<User> {
    const newUser = this.userRepository.create({ name });

    return this.userRepository.save(newUser); // insert or update
  }

  async updateUser(id: number, name: string): Promise<User> {
    const user = await this.getOneById(id);

    user.name = name;

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getOneById(id);

    return this.userRepository.remove(user);
  }
}
