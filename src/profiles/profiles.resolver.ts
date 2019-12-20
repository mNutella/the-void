import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ProfilesService } from './profiles.service';
import { Profile } from '../graphql';
import { ProfilesGuard } from './profiles.guard';
import { CreateProfileDto } from './dto/create-profile.dto';

const pubSub = new PubSub();

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
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Profile> {
    return await this.profilesService.findOneById(id);
  }

  @Mutation('createProfile')
  async create(
    @Args('createProfileInput') args: CreateProfileDto,
  ): Promise<Profile> {
    const createdProfile = await this.profilesService.create(args);
    pubSub.publish('profileCreated', { profileCreated: createdProfile });
    return createdProfile;
  }

  @Subscription('profileCreated')
  profileCreated() {
    return pubSub.asyncIterator('profileCreated');
  }
}
