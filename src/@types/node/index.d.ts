declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: "production" | "development" | "test";
    VUE_APP_POLYGON_RPC_URL?: string;
    VUE_APP_VERIDA_CONTEXT_NAME?: string;
    VUE_APP_VERIDA_VAULT_CONTEXT_NAME?: string;
    VUE_APP_VERIDA_LOGO_URL?: string;
    VUE_APP_VERDIA_LOGIN_TEXT?: string;
    VUE_APP_BASE_URL?: string;
    VUE_APP_VERIDA_ENV?: "testnet" | "mainnet" | "local";
  }
}
