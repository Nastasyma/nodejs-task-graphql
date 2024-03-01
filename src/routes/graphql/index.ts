import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { getDataLoaders } from './loaders/loaders.js';
import { schema } from './schema/schema.js';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const errors = validate(schema, parse(query), [depthLimit(5)]);
      if (errors && errors.length > 0) {
        return {
          data: null,
          errors,
        };
      }

      return graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma: fastify.prisma,
          dataLoaders: getDataLoaders(fastify.prisma),
        },
      });
    },
  });
};

export default plugin;
