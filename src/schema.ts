import 'graphql-import-node';

import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import * as typeDefs from './definitions/schema.graphql';
import resolvers from './resolvers/resolverMap';


const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;