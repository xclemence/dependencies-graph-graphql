import './env';

import depthLimit from 'graphql-depth-limit';
import { driver } from 'neo4j-driver';
import { OGM } from '@neo4j/graphql-ogm';

import { getTypesFiles, getResolvers } from './schema';
import { Context } from './types/context';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { Neo4jGraphQLConfig } from '@neo4j/graphql/dist/classes';
import { ApolloServer } from 'apollo-server-express';

export function createApolloServerWithToken(
  neo4jHost: string,
  tokenValidation: { publicKey: string, rolesPath: string | undefined }
): ApolloServer {

  return createApolloServerBase(
    neo4jHost,
    true,
    {
      jwt: {
        secret: tokenValidation.publicKey,
        rolesPath: tokenValidation.rolesPath
      }
    }
  );
}

export function createApolloServerNoToken(neo4jHost: string): ApolloServer {
  return createApolloServerBase(neo4jHost, false);
}


function createApolloServerBase(
  neo4jHost: string,
  enabledSecurity: boolean,
  config?: Neo4jGraphQLConfig
): ApolloServer {

  const driverInstance = driver(neo4jHost);
  const typesFiles = getTypesFiles(enabledSecurity);

  const ogm = new OGM({
    typeDefs: typesFiles,
    driver: driverInstance,
  });

  const neo4jGraphQL = new Neo4jGraphQL({
    typeDefs: typesFiles,
    resolvers: getResolvers(),
    config
  });

  return new ApolloServer({
    schema: neo4jGraphQL.schema,
    validationRules: [depthLimit(10)],
    context: ({ req }) => ({ req, ogm, driver: driverInstance } as Context)
  });
}
