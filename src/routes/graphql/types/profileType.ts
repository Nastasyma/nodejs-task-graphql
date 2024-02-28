import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './userType.js';
import { IContext, IProfile } from './interfaces.js';
import { MemberType, MemberTypeId } from './memberTypes.js';

export const ProfileType: GraphQLObjectType<IProfile, IContext> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    user: {
      type: UserType,
      resolve: async (source, _args: unknown, context: IContext) =>
        await context.prisma.user.findUnique({ where: { id: source.userId } }),
    },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberType: {
      type: MemberType,
      resolve: async (source, _args: unknown, context: IContext) =>
        await context.prisma.memberType.findUnique({
          where: { id: source.memberTypeId },
        }),
    },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  }),
});
