import { CreateTagInput } from './create-tag.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTagInput extends PartialType(CreateTagInput) {}
