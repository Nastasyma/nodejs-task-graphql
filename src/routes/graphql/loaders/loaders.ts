import { PrismaClient } from '@prisma/client';
import { IDataLoaders } from '../types/interfaces.js';
import { userLoader } from './userLoader.js';

export const getDataLoaders = (prisma: PrismaClient): IDataLoaders => ({
  userLoader: userLoader(prisma),
});