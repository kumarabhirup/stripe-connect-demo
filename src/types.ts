export type Maybe<T> = T | undefined | null;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      DB: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      STRIPE_SECRET_KEY: string;
      NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID: string;
    }
  }
}

export interface ShortUrlInput {
  url: string;
  customAlias?: string;
}

export {};
