import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEpisodeInput } from './dto/create-episode.input';
import { EpisodeOutput } from './dto/episode.output';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { Episode } from './entities/episode.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode) private readonly repo: Repository<Episode>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  async create(createEpisodeInput: CreateEpisodeInput): Promise<EpisodeOutput> {
    return await this.repo
      .save(this.mapper.map(createEpisodeInput, Episode, CreateEpisodeInput))
      .then((entity) => this.mapper.map(entity, EpisodeOutput, Episode));
  }

  async update(
    id: string,
    updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<EpisodeOutput> {
    const currentEpisodeEntity = await this.repo.findOne(id);

    if (!currentEpisodeEntity)
      throw new HttpException("Episode doesn't exist", HttpStatus.NOT_FOUND);

    const mergedEpisodeInput = {
      ...currentEpisodeEntity,
      ...updateEpisodeInput,
    } as UpdateEpisodeInput;

    return await this.repo
      .save(this.mapper.map(mergedEpisodeInput, Episode, UpdateEpisodeInput))
      .then((entity) => this.mapper.map(entity, EpisodeOutput, Episode));
  }

  async findAll(): Promise<EpisodeOutput[]> {
    return await this.repo
      .find({ relations: ['accomplices', 'tags'] })
      .then((entities) => this.mapper.mapArray(entities, EpisodeOutput, Episode));
  }

  async findAllBy(ids: string[]): Promise<EpisodeOutput[]> {
    return await this.repo
      .find({ where: { id: ids } })
      .then((episodeEntities) =>
        this.mapper.mapArray(episodeEntities, EpisodeOutput, Episode),
      );
  }

  async findOne(id: string): Promise<EpisodeOutput> {
    return await this.repo
      .findOne(id)
      .then((entity) => this.mapper.map(entity, EpisodeOutput, Episode));
  }

  async removeBy(ids: string[]): Promise<EpisodeOutput[]> {
    const episodeEntities = await this.repo.find({ where: { id: ids } });

    if (!episodeEntities?.length)
      throw new HttpException("Episodes doen't exist", HttpStatus.NOT_FOUND);

    return await this.repo
      .remove(episodeEntities)
      .then((removedEpisodeEntities) =>
        removedEpisodeEntities.map((entity) =>
          this.mapper.map(entity, EpisodeOutput, Episode),
        ),
      );
  }

  async remove(id: string): Promise<EpisodeOutput> {
    const episodeEntity = await this.repo.findOne(id);

    if (!episodeEntity)
      throw new HttpException("Episode doesn't exist", HttpStatus.NOT_FOUND);

    return await this.repo
      .remove(episodeEntity)
      .then((removedEntity) => this.mapper.map(removedEntity, EpisodeOutput, Episode));
  }
}
