import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeInput } from './dto/create-episode.input';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { EpisodeOutput } from './dto/episode.output';

@Resolver('Episode')
export class EpisodesResolver {
  constructor(private readonly episodesService: EpisodesService) {}

  @Query('episodes')
  async findAll() {
    return await this.episodesService.findAll();
  }

  @Query('episodesBy')
  async findAllBy(@Args('ids') ids: string[]) {
    return await this.episodesService.findAllBy(ids);
  }

  @Query('episode')
  async findOne(@Args('id') id: string) {
    return await this.episodesService.findOne(id);
  }

  @Mutation('createEpisode')
  async create(
    @Args('createEpisodeInput') createEpisodeInput: CreateEpisodeInput,
  ): Promise<EpisodeOutput> {
    return await this.episodesService.create(createEpisodeInput);
  }

  @Mutation('updateEpisode')
  async update(
    @Args('updateEpisodeInput') updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<EpisodeOutput> {
    return await this.episodesService.update(updateEpisodeInput.id, updateEpisodeInput);
  }

  @Mutation('removeEpisodes')
  async removeBy(@Args('ids') ids: string[]): Promise<EpisodeOutput[]> {
    return await this.episodesService.removeBy(ids);
  }

  @Mutation('removeEpisode')
  async remove(@Args('id') id: string): Promise<EpisodeOutput> {
    return await this.episodesService.remove(id);
  }
}
