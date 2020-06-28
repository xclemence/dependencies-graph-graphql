declare module 'neo4j-graphql-js' {
    
    import { ApolloServerExpressConfig } from 'apollo-server-express';
    import { ExecutionResult, GraphQLFieldResolver, GraphQLResolveInfo, GraphQLSchema } from 'graphql';
    import { Driver } from 'neo4j-driver';


    export function makeAugmentedSchema(options: MakeAugmentedSchemaOptions): GraphQLSchema;

    export function neo4jgraphql(
        object: any,
        args: RequestArguments,
        context: Neo4jContext,
        resolveInfo: GraphQLResolveInfo,
        debug: boolean,
    ): ExecutionResult;

    export function augmentSchema(schema: GraphQLSchema, config: AugmentSchemaConfig): GraphQLSchema;
    export function cypherQuery(args: RequestArguments, context: any, resolveInfo: GraphQLResolveInfo): CypherResult;
    export function cypherMutation(args: RequestArguments, context: any, resolveInfo: GraphQLResolveInfo): CypherResult;
    export function inferSchema(driver: Driver, options: InferSchemaOptions): Promise<InferSchemaPromise>;

    export interface Neo4jContext extends Partial<ApolloServerExpressConfig> {
        driver: Driver;
    }

    interface InferSchemaOptions {
        alwaysIncludeRelationships: boolean;
    }

    interface InferSchemaPromise {
        typeDefs: string;
    }

    type CypherResult = [string, { [key: string]: any }];

    export interface RequestArguments {
        [key: string]: any;
    }

    interface AugmentSchemaResolvers {
        [key: string]: GraphQLFieldResolver<any, any, { [argName: string]: any }>;
    }

    interface AugmentSchemaLogger {
        log: (msg: string) => void;
    }

    interface AugmentSchemaParseOptions {
        [key: string]: any;
    }

    interface AugmentSchemaResolverValidationOptions {
        requireResolversForArgs: boolean;
        requireResolversForNonScalar: boolean;
        requireResolversForAllFields: boolean;
        requireResolversForResolveType: boolean;
        allowResolversNotInSchema: boolean;
    }

    interface AugmentSchemaDirectives {
        [key: string]: (next: Promise<any>, src: any, args: RequestArguments, context: any) => Promise<any>;
    }

    type DirectiveResolvers = {
        [key: string]: () => any;
    };

    interface AugmentSchemaAuthConfig {
        isAuthenticated?: boolean;
        hasRole?: boolean;
        hasScope?: boolean;
    }

    interface AugmentSchemaConfig {
        query?: boolean | { exclude: string[] };
        mutation?: boolean | { exclude: string[] };
        debug?: boolean;
        auth?: boolean | AugmentSchemaAuthConfig;
    }

    interface MakeAugmentedSchemaOptions {
        schema?: GraphQLSchema;
        typeDefs: any;
        resolvers?: AugmentSchemaResolvers;
        logger?: AugmentSchemaLogger;
        parseOptions?: AugmentSchemaParseOptions;
        config?: AugmentSchemaConfig;
        allowUndefinedInResolve?: boolean;
        resolverValidationOptions?: AugmentSchemaResolverValidationOptions;
        directiveResolvers?: DirectiveResolvers;
        schemaDirectives?: AugmentSchemaDirectives;
        inheritResolversFromInterfaces?: boolean;
    }
}
