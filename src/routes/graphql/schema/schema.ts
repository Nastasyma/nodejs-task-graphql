import { GraphQLSchema } from 'graphql';
import { query } from './query.js';

export const schema = new GraphQLSchema({ query });
