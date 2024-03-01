import { PrismaClient } from "@prisma/client";
import { IProfile } from "../types/interfaces.js";
import DataLoader from "dataloader";

export const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const profiles: IProfile[] = await prisma.profile.findMany({
      where: {
        userId: {
          in: ids as string[],
        },
      },
    });

    return ids.map((id) => profiles.find((profile) => profile.userId === id));
  });
}