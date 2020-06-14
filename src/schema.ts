import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { GraphQLSchema } from 'graphql';
import { makeAugmentedSchema } from 'neo4j-graphql-js';
import path from 'path';

const typesFiles = loadFilesSync(path.join(__dirname, 'definitions/*.graphql'))
const typeDefs = mergeTypeDefs(typesFiles)

const resolversFiles = loadFilesSync(path.join(__dirname, 'resolvers/*.ts'));
const resolvers = mergeResolvers(resolversFiles);

const schema: GraphQLSchema = makeAugmentedSchema({
    typeDefs,
    resolvers,
    config: {
        mutation: false
    }
});

export default schema;
