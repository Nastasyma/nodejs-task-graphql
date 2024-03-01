import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { IContext, IMemberType } from './interfaces.js';
import { ProfileType } from './profileType.js';

export const MemberType: GraphQLObjectType<IMemberType, IContext> = new GraphQLObjectType(
  {
    name: 'MemberType',
    fields: () => ({
      id: { type: new GraphQLNonNull(MemberTypeId) },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
      postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },

      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async (source, _args: unknown, context: IContext) =>
          await context.prisma.profile.findMany({ where: { memberTypeId: source.id } }),
      },
    }),
  },
);

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: 'basic',
    },
    business: {
      value: 'business',
    },
  },
});
