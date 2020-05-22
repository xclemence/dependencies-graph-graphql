import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import path from 'path';
import { makeAugmentedSchema } from 'neo4j-graphql-js';

import { GraphQLSchema } from 'graphql';

const typesFiles= loadFilesSync(path.join(__dirname, 'definitions/*.graphql'))
const typeDefs = mergeTypeDefs(typesFiles)

const resolversFiles = loadFilesSync(path.join(__dirname, 'resolvers/*.ts'));
const resolvers = mergeResolvers(resolversFiles);

const schema: GraphQLSchema = makeAugmentedSchema({ typeDefs , resolvers });

export default schema;