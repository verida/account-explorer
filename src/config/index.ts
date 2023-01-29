import { EnvironmentType } from "@verida/client-ts";

const nodeEnv = process.env.NODE_ENV || "development";

const veridaEnv: EnvironmentType =
  process.env.VUE_APP_VERIDA_ENV === "local"
    ? EnvironmentType.LOCAL
    : process.env.VUE_APP_VERIDA_ENV === "mainnet"
    ? EnvironmentType.MAINNET
    : EnvironmentType.TESTNET;

const veridaLogoUrl = process.env.VUE_APP_VERIDA_LOGO_URL;
const veridaDidServerUrl = process.env.VUE_APP_VERIDA_DID_SERVER;
const veridaContextName = process.env.VUE_APP_VERIDA_CONTEXT_NAME;
const veridaVaultContextName = process.env.VUE_APP_VERIDA_VAULT_CONTEXT_NAME;

export const config = {
  nodeEnv,
  veridaEnv,
  veridaLogoUrl,
  veridaContextName,
  veridaDidServerUrl,
  veridaVaultContextName,
};
