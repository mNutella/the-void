import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
import { ProfilesService } from './profiles.service';
import { ProfilesGuard } from './profiles.guard';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';

// const pubSub = new PubSub();

@Resolver('Profiles')
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Query('profiles')
  @UseGuards(ProfilesGuard)
  async findAll() {
    return await this.profilesService.findAll();
  }

  @Query('profile')
  async findOneById(
    @Args('id')
    id: string,
  ): Promise<CreateProfileInput> {
    return await this.profilesService.findOne(id);
  }

  @Mutation('createProfile')
  async create(
    @Args('createProfileInput') args: CreateProfileInput,
  ): Promise<CreateProfileInput> {
    // pubSub.publish('profileCreated', { profileCreated: createdProfile });
    return await this.profilesService.create(args);
  }

  @Mutation('updateProfile')
  async update(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ): Promise<UpdateProfileInput> {
    return await this.profilesService.update(updateProfileInput.id, updateProfileInput);
  }

  @Mutation('removeProfile')
  async remove(@Args('id') id: string): Promise<Profile> {
    return await this.profilesService.remove(id);
  }

  // @Subscription('profileCreated')
  // profileCreated() {
  //   return pubSub.asyncIterator('profileCreated');
  // }
}
