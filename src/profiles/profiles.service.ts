import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlgoliaService } from '../algolia/algolia.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
    private readonly algoliaService: AlgoliaService,
  ) {}

  public async create(dto: CreateProfileInput): Promise<CreateProfileInput> {
    // TODO: to understand why toEntity is not a function when 'toEntity' isn't static method
    return this.repo
      .save(CreateProfileInput.toEntity(dto))
      .then(e => CreateProfileInput.fromEntity(e));
  }

  public async findAll(): Promise<CreateProfileInput[]> {
    return await this.repo
      .find()
      .then(items => items.map(e => CreateProfileInput.fromEntity(e)));
  }

  public async findOne(id: string): Promise<CreateProfileInput> {
    return await this.repo.findOne(id);
  }
}
