import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
import { ProfilesService } from './profiles.service';
import { ProfilesGuard } from './profiles.guard';
import { ProfileDTO } from './dto/profile.dto';

// const pubSub = new PubSub();

@Resolver('Profiles')
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Query()
  @UseGuards(ProfilesGuard)
  async getProfiles() {
    return await this.profilesService.findAll();
  }

  @Query('profile')
  async findOneById(
    @Args('id')
    id: string,
  ): Promise<ProfileDTO> {
    return await this.profilesService.findOneById(id);
  }

  @Mutation('createProfile')
  async create(
    @Args('createProfileInput') args: ProfileDTO,
  ): Promise<ProfileDTO> {
    const createdProfile = await this.profilesService.create(args);
    // pubSub.publish('profileCreated', { profileCreated: createdProfile });
    return createdProfile;
  }

  // @Subscription('profileCreated')
  // profileCreated() {
  //   return pubSub.asyncIterator('profileCreated');
  // }
}
