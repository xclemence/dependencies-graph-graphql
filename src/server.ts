import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { driver } from 'neo4j-driver';

import schema from './schema';
import depthLimit from 'graphql-depth-limit';

const port = 4001;

const driverInstance = driver(
  'bolt://localhost'
);

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(10)],
  context: { driver: driverInstance}
});

const app = express();

app.use('*', cors());
app.use(compression());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

httpServer.listen(
  { port },
  (): void => console.log(`\nGraphQL is now running on http://localhost:${port}/graphql`)
);
