import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagInput } from './dto/create-tag.input';
import { TagOutput } from './dto/tag.output';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly repo: Repository<Tag>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  create(createTagInput: CreateTagInput): Promise<CreateTagInput> {
    return this.repo
      .save(this.mapper.map(createTagInput, Tag, CreateTagInput))
      .then((entity) => this.mapper.map(entity, TagOutput, Tag));
  }

  async update(id: string, updateTagInput: UpdateTagInput): Promise<UpdateTagInput> {
    const currentTagEntity = await this.repo.findOne(id);

    if (!currentTagEntity)
      throw new HttpException("Tag doesn't exist", HttpStatus.NOT_FOUND);

    const mergedTagInput = {
      ...currentTagEntity,
      ...updateTagInput,
    } as UpdateTagInput;

    return await this.repo
      .save(this.mapper.map(mergedTagInput, Tag, UpdateTagInput))
      .then((entity) => this.mapper.map(entity, TagOutput, Tag));
  }

  public async findAll(): Promise<CreateTagInput[]> {
    return await this.repo
      .find({ relations: ['episodes'] })
      .then((entities) => this.mapper.mapArray(entities, TagOutput, Tag));
  }

  async findOne(id: string): Promise<CreateTagInput> {
    return await this.repo
      .findOne(id)
      .then((entity) => this.mapper.map(entity, TagOutput, Tag));
  }

  async remove(id: string): Promise<CreateTagInput> {
    const profileEntity = await this.repo.findOne(id);

    if (!profileEntity)
      throw new HttpException("Profile doesn't exist", HttpStatus.NOT_FOUND);

    return await this.repo
      .remove(profileEntity)
      .then((removedEntity) => this.mapper.map(removedEntity, TagOutput, Tag));
  }
}
