import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { IContext } from '../types/interfaces.js';
import { ChangeUserInputType, CreateUserInputType, UserType } from '../types/userType.js';
import { UUIDType } from '../types/uuid.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      type: UserType,
      args: { dto: { type: new GraphQLNonNull(CreateUserInputType) } },
      resolve: async (
        _source: unknown,
        args: { dto: { name: string; balance: number } },
        context: IContext,
      ) =>
        await context.prisma.user.create({
          data: args.dto,
        }),
    },

    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInputType) },
      },
      resolve: async (
        _source: unknown,
        args: { id: string; dto: { name: string; balance: number } },
        context: IContext,
      ) =>
        await context.prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        }),
    },

    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source: unknown, args: { id: string }, context: IContext) =>
        !!(await context.prisma.user.delete({ where: { id: args.id } })),
    },

    subscribeTo: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _source: unknown,
        args: { userId: string; authorId: string },
        context: IContext,
      ) =>
        await context.prisma.user.update({
          where: { id: args.userId },
          data: { userSubscribedTo: { create: { authorId: args.authorId } } },
        }),
    },

    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        _source: unknown,
        args: { userId: string; authorId: string },
        context: IContext,
      ) =>
        !!(await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: { subscriberId: args.userId, authorId: args.authorId },
          },
        })),
    },
  }),
});
