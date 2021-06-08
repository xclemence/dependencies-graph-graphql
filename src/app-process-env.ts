declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEO4J_HOST: string;
        NODE_ENV: 'development' | 'production';
        GRAPH_TOKEN_ROLES_PATH: string;
        GRAPH_SECURITY_ENABLED: string;
        GRAPH_TOKEN_AUTHORITY: string;
      }
    }
  }
  
export {}