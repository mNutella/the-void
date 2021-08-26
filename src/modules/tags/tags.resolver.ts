import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Resolver('Tag')
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Mutation('createTag')
  create(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagsService.create(createTagInput);
  }

  @Mutation('updateTag')
  update(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return this.tagsService.update(updateTagInput.id, updateTagInput);
  }

  @Query('tags')
  findAll() {
    return this.tagsService.findAll();
  }

  @Query('tag')
  findOne(@Args('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @Mutation('removeTag')
  remove(@Args('id') id: string) {
    return this.tagsService.remove(id);
  }
}
