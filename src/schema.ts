import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import path from 'path';

let typesFilesPatterns = [
    path.join(__dirname, 'definitions/*.graphql'),
    path.join(__dirname, 'definitions-rights/*.graphql')
];

export const typesFiles = loadFilesSync(typesFilesPatterns);

const resolverPatterns = [
    path.join(__dirname, 'resolvers/*.ts'),
    path.join(__dirname, 'resolvers/*.js')
];

const resolversFiles = loadFilesSync(resolverPatterns);
export const resolvers = mergeResolvers(resolversFiles);

