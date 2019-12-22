
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateProfileInput {
    name?: string;
    city?: string;
    type?: number;
    info?: string;
}

export abstract class IMutation {
    abstract createProfile(createProfileInput?: CreateProfileInput): Profile | Promise<Profile>;
}

export class Profile {
    id?: string;
    name?: string;
    city?: string;
    type?: number;
    info?: string;
}

export abstract class IQuery {
    abstract getProfiles(): Profile[] | Promise<Profile[]>;

    abstract profile(id: string): Profile | Promise<Profile>;
}

export abstract class ISubscription {
    abstract profileCreated(): Profile | Promise<Profile>;
}
