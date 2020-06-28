import { GraphQLResolveInfo } from 'graphql';
import { Neo4jContext, neo4jgraphql, RequestArguments } from 'neo4j-graphql-js';

import { executeCountQuery } from '../services/neo4j/count-query';

const resolvers = {
  Query: {
    isAlive(object: any, params: any, ctx: any, resolveInfo: GraphQLResolveInfo) {
      return true;
    },
    AssemblyCount(object: any, params: RequestArguments, ctx: Neo4jContext, resolveInfo: GraphQLResolveInfo) {
      return executeCountQuery(params, ctx, resolveInfo, "Assembly");
    },
    Assembly(object: any, params: RequestArguments, ctx: Neo4jContext, resolveInfo: GraphQLResolveInfo) {
      console.log(JSON.stringify(resolveInfo));

      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    }
  },
  Mutation: {
    hello: (parent: any, parameters: { name: String }, context: any, info: GraphQLResolveInfo): String => {
      return `Hello ${parameters.name}!`;
    }
  }
};

export default resolvers;

