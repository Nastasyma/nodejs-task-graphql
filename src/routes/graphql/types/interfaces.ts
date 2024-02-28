import { PrismaClient } from '@prisma/client';

export interface IContext {
  prisma: PrismaClient;
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
