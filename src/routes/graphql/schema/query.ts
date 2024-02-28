import { GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberType } from '../types/memberTypes.js';
import { IContext } from '../types/interfaces.js';
import { PostType } from '../types/postType.js';
import { UserType } from '../types/userType.js';
import { ProfileType } from '../types/profileType.js';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_source: unknown, _args: unknown, context: IContext) =>
        await context.prisma.memberType.findMany(),
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_source: unknown, _args: unknown, context: IContext) =>
        await context.prisma.post.findMany(),
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async (_source: unknown, _args: unknown, context: IContext) =>
        await context.prisma.user.findMany(),
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_source: unknown, _args: unknown, context: IContext) =>
        await context.prisma.profile.findMany(),
    },
  }),
});
