import 'graphql-import-node';

import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import { driver } from 'neo4j-driver';
import { makeAugmentedSchema } from 'neo4j-graphql-js';

import * as typeDefs from './definitions/schema.graphql';

// import typeDefs from './schema';

const driverInstance = driver(
  'bolt://localhost'
);

const app = express();

const schema = makeAugmentedSchema({ typeDefs });

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  context: { driver: driverInstance}
});

app.use('*', cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
const port = 4001;

httpServer.listen(
  { port },
  (): void => console.log(`\nGraphQL is now running on http://localhost:${port}/graphql`)
);