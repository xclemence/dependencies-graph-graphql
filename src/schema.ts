import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import path from 'path';

export function getTypesFiles(enabledSecurity: boolean): any[] {
  let typesFilesPatterns = [
    path.join(__dirname, 'definitions/*.graphql'),
  ];

  if (enabledSecurity) {
    typesFilesPatterns = [
      ...typesFilesPatterns,
      path.join(__dirname, 'definitions-rights/*.graphql')
    ];
  }

  return loadFilesSync(typesFilesPatterns);
}

export function getResolvers(): any {
  const resolverPatterns = [
    path.join(__dirname, 'resolvers/*.ts'),
    path.join(__dirname, 'resolvers/*.js')
  ];

  const resolversFiles = loadFilesSync(resolverPatterns);
  return mergeResolvers(resolversFiles);
}