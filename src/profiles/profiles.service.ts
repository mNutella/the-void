import { Injectable, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { ProfileDTO } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
  ) {}

  public async create(dto: ProfileDTO): Promise<ProfileDTO> {
    // TODO: to understand why toEntity is not a function when 'toEntity' isn't static method
    return this.repo
      .save(ProfileDTO.toEntity(dto))
      .then(e => ProfileDTO.fromEntity(e));
  }

  @Get()
  public async findAll(): Promise<ProfileDTO[]> {
    return await this.repo
      .find()
      .then(items => items.map(e => ProfileDTO.fromEntity(e)));
  }

  @Get(':id')
  public async findOneById(@Param('id') id): Promise<Profile[]> {
    return await this.repo.find({ where: { id } });
  }
}