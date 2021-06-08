import './env';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';

import { getPublicKey } from './keycloak';
import { createApolloServerNoToken, createApolloServerWithToken } from './apollo-server';
import { ApolloServer } from 'apollo-server-express';

const port = 4001;

if (!process.env.NEO4J_HOST) {
  throw new Error('Unexpected error: Missing host name');
}

const host = process.env.NEO4J_HOST;
const rolesPath = process.env.GRAPH_TOKEN_ROLES_PATH;
const securityEnabled = process.env.GRAPH_SECURITY_ENABLED === 'true';
const tokenAuthority = process.env.GRAPH_TOKEN_AUTHORITY;

(async () => {
  try {

    const app = express();

    let server: ApolloServer;

    if (securityEnabled) {

      if (!tokenAuthority) {
        throw new Error('Unexpected error: Missing token Authority');
      }

      if (!rolesPath) {
        throw new Error('Unexpected error: Missing token roles path');
      }

      const publicKey = await getPublicKey(tokenAuthority);
      server = createApolloServerWithToken(host, { publicKey, rolesPath });
    }
    else {
      server = createApolloServerNoToken(host);
    }

    app.use(cors());
    app.use(compression());

    server.applyMiddleware({ app, path: '/graphql' });

    const httpServer = createServer(app);

    httpServer.listen(
      { port },
      (): void => console.log(`\nGraphQL is now running on http://localhost:${port}/graphql`)
    );

  } catch(error: any) {
    console.error(error);
  }

})();

