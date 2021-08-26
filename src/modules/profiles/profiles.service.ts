import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlgoliaService } from '@modules/algolia/algolia.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { Profile } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
    private readonly algoliaService: AlgoliaService,
  ) {}

  public async create(dto: CreateProfileInput): Promise<CreateProfileInput> {
    return this.repo
      .save(CreateProfileInput.toEntity(dto))
      .then((e) => CreateProfileInput.fromEntity(e));
  }

  async update(id: string, updateProfileInput: UpdateProfileInput) {
    const currentProfileEntity = await this.repo.findOne(id);

    if (!currentProfileEntity)
      throw new HttpException("Profile doesn't exist", HttpStatus.NOT_FOUND);

    return (await this.repo.save({
      ...currentProfileEntity,
      ...updateProfileInput,
    })) as UpdateProfileInput;
  }

  public async findAll(): Promise<CreateProfileInput[]> {
    return await this.repo
      .find({ relations: ['episodes'] })
      .then((items) => items.map((e) => CreateProfileInput.fromEntity(e)));
  }

  public async findOne(id: string): Promise<CreateProfileInput> {
    return await this.repo.findOne(id);
  }

  async remove(id: string): Promise<Profile> {
    const profileEntity = await this.repo.findOne(id);

    if (!profileEntity)
      throw new HttpException("Profile doesn't exist", HttpStatus.NOT_FOUND);

    return await this.repo.remove(profileEntity);
  }
}
