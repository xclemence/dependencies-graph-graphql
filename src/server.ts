import './env';

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import { driver } from 'neo4j-driver';
import { OGM } from '@neo4j/graphql-ogm';

import schema, { typesFiles } from './schema';
import { Context } from './types/context';

const port = 4001;

if(!process.env.NEO4J_HOST) {
  throw new Error('Unexpected error: Missing host name');
}

const driverInstance = driver(process.env.NEO4J_HOST);

const ogm = new OGM({
  typeDefs: typesFiles,
  driver: driverInstance,
});

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(10)],
  context: () => ({ ogm, driver: driverInstance } as Context),
});

const app = express();

app.use(cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

httpServer.listen(
  { port },
  (): void => console.log(`\nGraphQL is now running on http://localhost:${port}/graphql`)
);
