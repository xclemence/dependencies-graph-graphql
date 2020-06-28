import { cypherQuery } from 'neo4j-graphql-js';

import { executeQuery } from './utils';

export async function executeCountQuery(
    params: any,
    context: any,
    resolveInfo: any,
    baseType: string
  ) {

    const queryResolverInfo = {
      ...resolveInfo,
      returnType: baseType,
      fieldNodes: [
        {
          ...resolveInfo.fieldNodes[0],
          name: {
            kind: "Name",
            value: baseType,
          },
          selectionSet: {
            kind: "SelectionSet",
            selections: [
              {
                "kind": "Field",
                "name": {
                  "kind": "Name",
                  "value": "_id",
                },
              }
            ],
          },
        }
      ]
    };
  
    const [query, cypherParams] = cypherQuery(
      params,
      context,
      queryResolverInfo
    );
  
    // Add Call and count query
    const newQuery = `call {
      ${query}
    } return COUNT(*) as int`;
    
    return await executeQuery(context, newQuery, cypherParams, resolveInfo.returnType);
  }
  
  