import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlgoliaService } from '@modules/algolia/algolia.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ProfileOutput } from './dto/profile.output';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly algoliaService: AlgoliaService,
  ) {}

  public async create(createProfileInput: CreateProfileInput): Promise<ProfileOutput> {
    return this.repo
      .save(this.mapper.map(createProfileInput, Profile, CreateProfileInput))
      .then((entity) => this.mapper.map(entity, ProfileOutput, Profile));
  }

  async update(
    id: string,
    updateProfileInput: UpdateProfileInput,
  ): Promise<ProfileOutput> {
    const currentProfileEntity = await this.repo.findOne(id);

    if (!currentProfileEntity)
      throw new HttpException("Profile doesn't exist", HttpStatus.NOT_FOUND);

    const mergedProfileInput = {
      ...currentProfileEntity,
      ...updateProfileInput,
    } as UpdateProfileInput;

    return await this.repo
      .save(this.mapper.map(mergedProfileInput, Profile, UpdateProfileInput))
      .then((entity) => this.mapper.map(entity, ProfileOutput, Profile));
  }

  public async findAll(): Promise<ProfileOutput[]> {
    return await this.repo
      .find({ relations: ['episodes'] })
      .then((entities) => this.mapper.mapArray(entities, ProfileOutput, Profile));
  }

  public async findOne(id: string): Promise<ProfileOutput> {
    return await this.repo
      .findOne(id)
      .then((entity) => this.mapper.map(entity, ProfileOutput, Profile));
  }

  async remove(id: string): Promise<CreateProfileInput> {
    const profileEntity = await this.repo.findOne(id);

    if (!profileEntity)
      throw new HttpException("Profile doesn't exist", HttpStatus.NOT_FOUND);

    return await this.repo
      .remove(profileEntity)
      .then((removedEntity) => this.mapper.map(removedEntity, ProfileOutput, Profile));
  }
}
