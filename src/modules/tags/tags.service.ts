import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly repo: Repository<Tag>) {}

  create(createTagInput: CreateTagInput): Promise<CreateTagInput> {
    return this.repo
      .save(CreateTagInput.toEntity(createTagInput))
      .then((e) => CreateTagInput.fromEntity(e));
  }

  async update(id: string, updateTagInput: UpdateTagInput): Promise<UpdateTagInput> {
    const currentTagEntity = await this.repo.findOne(id);

    if (!currentTagEntity)
      throw new HttpException("Tag doesn't exist", HttpStatus.NOT_FOUND);

    return await this.repo.save({
      ...currentTagEntity,
      ...updateTagInput,
    });
  }

  public async findAll(): Promise<CreateTagInput[]> {
    return await this.repo
      .find({ relations: ['episodes'] })
      .then((items) => items.map((e) => CreateTagInput.fromEntity(e)));
  }

  async findOne(id: string): Promise<CreateTagInput> {
    return await this.repo.findOne(id);
  }

  async remove(id: string): Promise<CreateTagInput> {
    const profileEntity = await this.repo.findOne(id);

    if (!profileEntity)
      throw new HttpException("Profile doesn't exist", HttpStatus.NOT_FOUND);

    return await this.repo.remove(profileEntity);
  }
}
