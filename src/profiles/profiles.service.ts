import { Injectable } from '@nestjs/common';
import { Profile } from '../graphql';

@Injectable()
export class ProfilesService {
  private readonly profiles: Profile[] = [
    { id: 1, name: 'Profile', city: 'Moscow', type: 1, info: '' },
    { id: 2, name: 'Profile', city: 'Moscow', type: 1, info: '' },
  ];

  create(profile: Profile): Profile {
    profile.id = this.profiles.length + 1;
    this.profiles.push(profile);
    return profile;
  }

  findAll(): Profile[] {
    return this.profiles;
  }

  findOneById(id: number): Profile {
    return this.profiles.find(profile => profile.id === id);
  }
}
