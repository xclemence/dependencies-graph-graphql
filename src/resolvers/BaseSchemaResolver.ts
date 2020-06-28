import { GraphQLResolveInfo } from 'graphql';
import { Neo4jContext, RequestArguments } from 'neo4j-graphql-js';

import { executeCountQuery } from '../services/neo4j/count-query';

const resolvers = {
  Query: {
    isAlive(object: any, params: any, ctx: any, resolveInfo: GraphQLResolveInfo) {
      return true;
    },
    AssemblyCount(object: any, params: RequestArguments, ctx: Neo4jContext, resolveInfo: GraphQLResolveInfo) {
      return executeCountQuery(params, ctx, resolveInfo, "Assembly");
    },
  },
  Mutation: {
    hello: (parent: any, parameters: { name: String }, context: any, info: GraphQLResolveInfo): String => {
      return `Hello ${parameters.name}!`;
    }
  }
};

export default resolvers;

