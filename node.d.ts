declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET_KEY: string;
    }
  }
}
export {};
