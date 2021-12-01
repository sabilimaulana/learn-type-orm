import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
  constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>) {}

  getAll(): Promise<Pet[]> {
    return this.petRepository.find({ relations: ['owner'] });
  }

  async getOneById(id: number): Promise<Pet> {
    try {
      const pet = await this.petRepository
        .createQueryBuilder('pet')
        .leftJoinAndSelect('pet.owner', 'user')
        .where('pet.id = :id', { id })
        .getOne();

      // const pet = await this.petRepository.findOneOrFail(id);
      return pet;
    } catch (error) {
      throw error;
    }
  }

  createPet({ name, owner }: { name: string; owner: User }): Promise<Pet> {
    const newPet = this.petRepository.create({ name, owner });

    return this.petRepository.save(newPet); // insert or update
  }

  async updatePet({ id, name, owner }: Pet): Promise<Pet> {
    const pet = await this.getOneById(id);

    pet.name = name;
    pet.owner = owner;

    return this.petRepository.save(pet);
  }

  async deletePet(id: number): Promise<Pet> {
    const pet = await this.getOneById(id);

    return this.petRepository.remove(pet);
  }
}
