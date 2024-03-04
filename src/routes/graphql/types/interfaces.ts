import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export interface IContext {
  prisma: PrismaClient;
  dataLoaders: IDataLoaders;
}

export interface IMemberType {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
}

export interface IUser {
  id: string;
  name: string;
  balance: number;
  posts?: IPost[];
  profile?: IProfile;
  userSubscribedTo?: ISubscriberOnAuthor[];
  subscribedToUser?: ISubscriberOnAuthor[];
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export interface IProfile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export interface ISubscriberOnAuthor {
  subscriberId: string;
  authorId: string;
}

export interface IDataLoaders {
  userLoader: DataLoader<string, IUser | undefined, string>;
  postsLoader: DataLoader<string, IPost[] | undefined, string>;
  profileLoader: DataLoader<string, IProfile | undefined, string>;
  memberTypeLoader: DataLoader<string, IMemberType | undefined, string>;
}
