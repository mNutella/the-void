import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileInput } from './create-profile.input';

export class UpdateProfileInput extends PartialType(CreateProfileInput) {}
