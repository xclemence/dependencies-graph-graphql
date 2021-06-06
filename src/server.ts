import './env';

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import { driver } from 'neo4j-driver';
import { OGM } from '@neo4j/graphql-ogm';

import { typesFiles, resolvers } from './schema';
import { Context } from './types/context';
import { getPublicKey } from './keycloak';
import jwt from 'express-jwt';
import { Neo4jGraphQL } from '@neo4j/graphql';

const port = 4001;

if (!process.env.NEO4J_HOST) {
  throw new Error('Unexpected error: Missing host name');
}

const host = process.env.NEO4J_HOST;

(async() => {
  const publicKey = await getPublicKey('http://localhost:9080/auth/realms/dependencies');
  const driverInstance = driver(host);

  const ogm = new OGM({
    typeDefs: typesFiles,
    driver: driverInstance,
  });

  console.log(publicKey);

  const neo4jGraphQL = new Neo4jGraphQL({
    typeDefs: typesFiles,
    resolvers,
    config: {
      jwt: {
          secret: publicKey,
          // secret: 'et merde',
          rolesPath: "resource_access.graph-graphql.roles"
      }
    }
  });

  const server = new ApolloServer({
    schema: neo4jGraphQL.schema,
    validationRules: [depthLimit(10)],
    context: ({req}) => {
      console.log(req);
      return ({ req, ogm, driver: driverInstance } as Context);
    }
  });

  const app = express();

  // app.use(jwt({ secret: publicKey, algorithms: ['RS256'] }));
  app.use(cors());
  app.use(compression());

  server.applyMiddleware({ app, path: '/graphql' });

  const httpServer = createServer(app);

  httpServer.listen(
    { port },
    (): void => console.log(`\nGraphQL is now running on http://localhost:${port}/graphql`)
  );

})();

