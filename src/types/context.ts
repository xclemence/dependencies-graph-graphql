import { Driver } from 'neo4j-driver';
import { OGM } from '@neo4j/graphql-ogm';
import { ExpressContext } from 'apollo-server-express';

export type Context = {
    ogm: OGM;
    driver: Driver;
    req: any;
};
