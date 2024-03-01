import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { IContext, IProfile } from './interfaces.js';
import { MemberType, MemberTypeId } from './memberTypes.js';
import { UserType } from './userType.js';
import { UUIDType } from './uuid.js';

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
        await context.dataLoaders.memberTypeLoader.load(source.memberTypeId),
    },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  }),
});
