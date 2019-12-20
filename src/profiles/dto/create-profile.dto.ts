import { Min, IsString, IsInt } from 'class-validator'; // TODO
import { CreateProfileInput } from '../../graphql';

export class CreateProfileDto extends CreateProfileInput {
  name: string;
  city: string;
  type: number;
  info: string;
}
