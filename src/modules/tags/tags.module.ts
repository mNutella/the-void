import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { TagsMapper } from './tags.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagsMapper, TagsResolver, TagsService],
})
export class TagsModule {}
