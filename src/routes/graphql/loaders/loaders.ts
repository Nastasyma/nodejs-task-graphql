import { PrismaClient } from '@prisma/client';
import { IDataLoaders } from '../types/interfaces.js';
import { memberTypeLoader } from './memberTypeLoader.js';
import { postsLoader } from './postsLoader.js';
import { profileLoader } from './profileLoader.js';
import { userLoader } from './userLoader.js';

export const getDataLoaders = (prisma: PrismaClient): IDataLoaders => ({
  userLoader: userLoader(prisma),
  postsLoader: postsLoader(prisma),
  profileLoader: profileLoader(prisma),
  memberTypeLoader: memberTypeLoader(prisma),
});
