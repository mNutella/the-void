import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEpisodeInput } from './dto/create-episode.input';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { Episode } from './entities/episode.entity';

@Injectable()
export class EpisodesService {
  constructor(@InjectRepository(Episode) private readonly repo: Repository<Episode>) {}
  async create(createEpisodeInput: CreateEpisodeInput): Promise<CreateEpisodeInput> {
    return await this.repo
      .save(CreateEpisodeInput.toEntity(createEpisodeInput))
      .then((e) => CreateEpisodeInput.fromEntity(e));
  }

  async findAll(): Promise<CreateEpisodeInput[]> {
    return await this.repo
      .find({ relations: ['accomplices'] })
      .then((items) => items.map((e) => CreateEpisodeInput.fromEntity(e)));
  }

  async findAllBy(ids: string[]): Promise<CreateEpisodeInput[]> {
    return await this.repo
      .find({ where: { id: ids } })
      .then((items) => items.map((e) => CreateEpisodeInput.fromEntity(e)));
  }

  async findOne(id: string): Promise<CreateEpisodeInput> {
    return await this.repo.findOne(id);
  }

  async update(id: string, updateEpisodeInput: UpdateEpisodeInput) {
    const updateEpisodeEntity = await this.repo.findOne(id);

    if (!updateEpisodeEntity)
      throw new HttpException("Episode doesn't exist", HttpStatus.NOT_FOUND);

    return (await this.repo.save({
      ...updateEpisodeEntity,
      ...updateEpisodeInput,
    })) as UpdateEpisodeInput;
  }

  async removeBy(ids: string[]): Promise<Episode[]> {
    const episodeEntities = await this.repo.find({ where: { id: ids } });

    if (!episodeEntities?.length)
      throw new HttpException("Episodes doen't exist", HttpStatus.NOT_FOUND);

    return await this.repo.remove(episodeEntities);
  }

  async remove(id: string): Promise<Episode> {
    const episodeEntity = await this.repo.findOne(id);

    if (!episodeEntity)
      throw new HttpException("Episode doesn't exist", HttpStatus.NOT_FOUND);

    return await this.repo.remove(episodeEntity);
  }
}
