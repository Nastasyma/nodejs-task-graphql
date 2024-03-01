import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { PostType } from './postType.js';
import { IContext, IUser } from './interfaces.js';
import { ProfileType } from './profileType.js';

export const UserType: GraphQLObjectType<IUser, IContext> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source, _args: unknown, context: IContext) =>
        await context.dataLoaders.postsLoader.load(source.id),
    },

    profile: {
      type: ProfileType,
      resolve: async (source, _args: unknown, context: IContext) =>
        await context.prisma.profile.findUnique({ where: { userId: source.id } }),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args: unknown, context: IContext) =>
      source.userSubscribedTo && source.userSubscribedTo.length
        ? context.dataLoaders.userLoader.loadMany(source.userSubscribedTo.map(({ authorId }) => authorId))
        : null,
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args: unknown, context: IContext) =>
      source.subscribedToUser && source.subscribedToUser.length
        ? context.dataLoaders.userLoader.loadMany(source.subscribedToUser.map(({ subscriberId }) => subscriberId))
        : null,
    },
  }),
});