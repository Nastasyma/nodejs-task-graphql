import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './userType.js';
import { IContext, IPost } from './interfaces.js';

export const PostType: GraphQLObjectType<IPost, IContext> = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: async (source: { authorId: string }, _args: unknown, context: IContext) =>
        await context.prisma.user.findUnique({ where: { id: source.authorId } }),
    },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});
