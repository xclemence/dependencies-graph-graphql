import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import path from 'path';
import { Neo4jGraphQL } from '@neo4j/graphql';

export const typesFiles = loadFilesSync(path.join(__dirname, 'definitions/*.graphql'))

const resolverPatterns = [
    path.join(__dirname, 'resolvers/*.ts'),
    path.join(__dirname, 'resolvers/*.js')
];

 const resolversFiles = loadFilesSync(resolverPatterns);
const resolvers = mergeResolvers(resolversFiles);

const neo4jGraphQL = new Neo4jGraphQL({
    typeDefs: typesFiles,
    resolvers,
});

const schema = neo4jGraphQL.schema;

export default schema;
