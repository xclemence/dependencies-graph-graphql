import { GraphQLOutputType } from 'graphql';
import _ from 'lodash';
import neo4j from 'neo4j-driver';

function isArrayType(type: any): boolean {
    return type ? type.toString().startsWith('[') : false;
}

function lowFirstLetter(word: string): string {
    return word.charAt(0).toLowerCase() + word.slice(1);
}

function innerType(type: any): any {
    return type.ofType ? innerType(type.ofType) : type;
}

function typeIdentifiers(returnType: GraphQLOutputType): { variableName: string, typeName: string } {
    const typeName = innerType(returnType).toString();
    return {
        variableName: lowFirstLetter(typeName),
        typeName: typeName
    };
}

export function extractQueryResult(rowResult: { records: any }, returnType: GraphQLOutputType): any {
    const { variableName } = typeIdentifiers(returnType);
    let result = null;
    if (isArrayType(returnType)) {
        result = rowResult.records.map((record: any) => record.get(variableName));
    } else if (rowResult.records.length) {
        // could be object or scalar
        result = rowResult.records[0].get(variableName);
        result = Array.isArray(result) ? result[0] : result;
    }
    result = _.cloneDeepWith(result, (field: any) => {
        if (neo4j.isInt(field)) {
            return field.inSafeRange() ? field.toNumber() : field.toString();
        }
    });
    return result;
}

export const checkRequestError = (context: any) => {
    if (context && context.req && context.req.error) {
        return context.req.error;
    } else if (context && context.error) {
        return context.error;
    } else {
        return false;
    }
};


export async function executeQuery(
    context: any,
    query: string,
    queryParams: { [key: string]: any },
    returnType: GraphQLOutputType,
  ) {
    if (checkRequestError(context)) {
      throw new Error(checkRequestError(context));
    }
  
    if (!context.driver) {
      throw new Error(
        "No Neo4j JavaScript driver instance provided. Please ensure a Neo4j JavaScript driver instance is injected into the context object at the key 'driver'."
      );
    }
    context.driver._userAgent = `dependencies-graph-graphql/1.0`;
  
    let session;
  
    if (context.neo4jDatabase) {
      try {
        session = context.driver.session({
          database: context.neo4jDatabase
        });
      } catch (e) {
        session = context.driver.session();
      }
    } else {
      // no database specified
      session = context.driver.session();
    }
  
    try {
      const result = await session.readTransaction((tx: any) => {
        return tx.run(query, queryParams);
      });
  
      return extractQueryResult(result, returnType);
    } finally {
      session.close();
    }
  }