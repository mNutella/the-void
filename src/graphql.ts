
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateEpisodeInput {
    id?: Nullable<string>;
    title?: Nullable<string>;
    desc?: Nullable<string>;
    sourceUrl?: Nullable<string>;
    accomplices?: Nullable<CreateProfileInput[]>;
    tags?: Nullable<Nullable<CreateTagInput>[]>;
    crimeDateTime?: Nullable<Date>;
}

export class UpdateEpisodeInput {
    id: string;
    title?: Nullable<string>;
    desc?: Nullable<string>;
    sourceUrl?: Nullable<string>;
    accomplices?: Nullable<UpdateProfileInput[]>;
    tags?: Nullable<Nullable<CreateTagInput>[]>;
    crimeDateTime?: Nullable<Date>;
}

export class CreateProfileInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    city?: Nullable<string>;
    type?: Nullable<number>;
    info?: Nullable<string>;
    episodes?: Nullable<CreateEpisodeInput[]>;
}

export class UpdateProfileInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    city?: Nullable<string>;
    type?: Nullable<number>;
    info?: Nullable<string>;
    episodes?: Nullable<UpdateEpisodeInput[]>;
}

export class CreateTagInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    episodes?: Nullable<Nullable<CreateEpisodeInput>[]>;
}

export class UpdateTagInput {
    id: string;
    name?: Nullable<string>;
    episodes?: Nullable<Nullable<CreateEpisodeInput>[]>;
}

export class Episode {
    id?: Nullable<string>;
    title?: Nullable<string>;
    desc?: Nullable<string>;
    sourceUrl?: Nullable<string>;
    accomplices?: Nullable<Profile[]>;
    tags?: Nullable<Nullable<Tag>[]>;
    crimeDateTime?: Nullable<Date>;
}

export abstract class IQuery {
    abstract episodes(): Nullable<Nullable<Episode>[]> | Promise<Nullable<Nullable<Episode>[]>>;

    abstract episodesBy(ids: Nullable<string>[]): Nullable<Nullable<Episode>[]> | Promise<Nullable<Nullable<Episode>[]>>;

    abstract episode(id: string): Nullable<Episode> | Promise<Nullable<Episode>>;

    abstract profiles(): Nullable<Nullable<Profile>[]> | Promise<Nullable<Nullable<Profile>[]>>;

    abstract profile(id: string): Nullable<Profile> | Promise<Nullable<Profile>>;

    abstract tags(): Nullable<Tag>[] | Promise<Nullable<Tag>[]>;

    abstract tag(id: string): Nullable<Tag> | Promise<Nullable<Tag>>;
}

export abstract class IMutation {
    abstract createEpisode(createEpisodeInput: CreateEpisodeInput): Nullable<Episode> | Promise<Nullable<Episode>>;

    abstract updateEpisode(updateEpisodeInput: UpdateEpisodeInput): Nullable<Episode> | Promise<Nullable<Episode>>;

    abstract removeEpisodes(ids: string[]): Nullable<Episode[]> | Promise<Nullable<Episode[]>>;

    abstract removeEpisode(id: string): Nullable<Episode> | Promise<Nullable<Episode>>;

    abstract createProfile(createProfileInput?: Nullable<CreateProfileInput>): Nullable<Profile> | Promise<Nullable<Profile>>;

    abstract updateProfile(updateProfileInput: UpdateProfileInput): Nullable<Profile> | Promise<Nullable<Profile>>;

    abstract removeProfile(id: string): Nullable<Profile> | Promise<Nullable<Profile>>;

    abstract createTag(createTagInput: CreateTagInput): Tag | Promise<Tag>;

    abstract updateTag(updateTagInput: UpdateTagInput): Tag | Promise<Tag>;

    abstract removeTag(id: string): Nullable<Tag> | Promise<Nullable<Tag>>;
}

export class Profile {
    id?: Nullable<string>;
    name?: Nullable<string>;
    city?: Nullable<string>;
    type?: Nullable<number>;
    info?: Nullable<string>;
    episodes?: Nullable<Nullable<Episode>[]>;
}

export abstract class ISubscription {
    abstract profileCreated(): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export class Tag {
    id?: Nullable<string>;
    name?: Nullable<string>;
    episodes?: Nullable<Nullable<Episode>[]>;
}

type Nullable<T> = T | null;
