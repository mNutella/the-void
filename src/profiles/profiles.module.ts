import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';
import { Profile } from './profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfilesResolver, ProfilesService],
})
export class ProfilesModule {}
