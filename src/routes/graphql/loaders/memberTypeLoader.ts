import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { IMemberType } from '../types/interfaces.js';

export const memberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const memberTypes: IMemberType[] = await prisma.memberType.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });

    return ids.map((id) => memberTypes.find((memberType) => memberType.id === id));
  });
};
