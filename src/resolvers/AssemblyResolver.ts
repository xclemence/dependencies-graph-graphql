import { neo4jgraphql } from 'neo4j-graphql-js';

const resolvers = {
  Query: {
    Assembly(object: any, params: any, ctx : any, resolveInfo: any) {
      return neo4jgraphql(object, params, ctx, resolveInfo);
    }
  }
};

export default resolvers;
