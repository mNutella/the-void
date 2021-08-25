import { CreateEpisodeInput } from './create-episode.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEpisodeInput extends PartialType(CreateEpisodeInput) {
}
