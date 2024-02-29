import { GraphQLSchema } from 'graphql';
import { query } from './query.js';
import { mutation } from './mutation.js';

export const schema = new GraphQLSchema({ query, mutation });
