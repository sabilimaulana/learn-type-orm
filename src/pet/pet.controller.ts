import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';

@Controller('pets')
export class PetController {
  constructor(
    private readonly petService: PetService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createUser(
    @Body() body: { name: string; owner: number },
  ): Promise<Pet> {
    const owner = await this.userService.getOneById(body.owner);

    return this.petService.createPet({ name: body.name, owner });
  }

  @Get()
  getAll(): Promise<Pet[]> {
    return this.petService.getAll();
  }

  @Get('/:petId')
  getById(@Param('petId', new ParseIntPipe()) petId: number): Promise<Pet> {
    return this.petService.getOneById(petId);
  }

  @Put('/:petId')
  async updateById(
    @Param('petId', new ParseIntPipe()) petId: number,
    @Body() body: { name: string; owner: number },
  ): Promise<Pet> {
    const owner = await this.userService.getOneById(body.owner);

    return this.petService.updatePet({
      id: petId,
      name: body.name,
      owner: owner,
    });
  }

  @Delete('/:petId')
  deleteById(@Param('petId', new ParseIntPipe()) petId: number): Promise<Pet> {
    return this.petService.deletePet(petId);
  }
}
