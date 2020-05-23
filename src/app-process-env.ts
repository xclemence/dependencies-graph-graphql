declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEO4J_HOST: string;
        NODE_ENV: 'development' | 'production';
      }
    }
  }
  
export {}