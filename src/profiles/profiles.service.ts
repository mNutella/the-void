import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { ProfileDTO } from './dto/profile.dto';
import { AlgoliaService } from '../algolia/algolia.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
    private readonly algoliaService: AlgoliaService,
  ) {}

  public async create(dto: ProfileDTO): Promise<ProfileDTO> {
    // TODO: to understand why toEntity is not a function when 'toEntity' isn't static method
    return this.repo
      .save(ProfileDTO.toEntity(dto))
      .then(e => ProfileDTO.fromEntity(e));
  }

  public async findAll(): Promise<ProfileDTO[]> {
    return await this.repo
      .find()
      .then(items => items.map(e => ProfileDTO.fromEntity(e)));
  }

  public async findOneById(id: string): Promise<ProfileDTO> {
    return await this.repo.findOne(id);
  }

  // TODO: Remove this method
  public async algoliaIndexes(): Promise<any> {
    return await this.algoliaService.listIndexes();
  }
}
