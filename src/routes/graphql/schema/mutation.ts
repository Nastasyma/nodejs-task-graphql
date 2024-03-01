import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import {
  ChangePostInputType,
  ChangeProfileInputType,
  ChangeUserInputType,
  CreatePostInputType,
  CreateProfileInputType,
  CreateUserInputType,
} from '../types/inputTypes.js';
import { IContext } from '../types/interfaces.js';
import { PostType } from '../types/postType.js';
import { ProfileType } from '../types/profileType.js';
import { UserType } from '../types/userType.js';
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

    changeUser: {
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

    createPost: {
      type: PostType,
      args: { dto: { type: new GraphQLNonNull(CreatePostInputType) } },
      resolve: async (
        _source: unknown,
        args: { dto: { title: string; content: string; authorId: string } },
        context: IContext,
      ) =>
        await context.prisma.post.create({
          data: args.dto,
        }),
    },

    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInputType) },
      },
      resolve: async (
        _source: unknown,
        args: { id: string; dto: { title: string; content: string } },
        context: IContext,
      ) =>
        await context.prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        }),
    },

    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source: unknown, args: { id: string }, context: IContext) =>
        !!(await context.prisma.post.delete({ where: { id: args.id } })),
    },

    createProfile: {
      type: ProfileType,
      args: { dto: { type: new GraphQLNonNull(CreateProfileInputType) } },
      resolve: async (
        _source: unknown,
        args: {
          dto: {
            userId: string;
            memberTypeId: string;
            isMale: boolean;
            yearOfBirth: number;
          };
        },
        context: IContext,
      ) =>
        await context.prisma.profile.create({
          data: args.dto,
        }),
    },

    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
      },
      resolve: async (
        _source: unknown,
        args: { id: string; dto: { isMale: boolean; yearOfBirth: number } },
        context: IContext,
      ) =>
        await context.prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        }),
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source: unknown, args: { id: string }, context: IContext) =>
        !!(await context.prisma.profile.delete({ where: { id: args.id } })),
    },
  }),
});
