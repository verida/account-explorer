import { EnvironmentType } from "@verida/client-ts";

const nodeEnv = process.env.NODE_ENV || "development";

const veridaEnv: EnvironmentType =
  process.env.VUE_APP_VERIDA_ENV === "local"
    ? EnvironmentType.LOCAL
    : process.env.VUE_APP_VERIDA_ENV === "mainnet"
    ? EnvironmentType.MAINNET
    : EnvironmentType.TESTNET;

const veridaLogoUrl = process.env.VUE_APP_VERIDA_LOGO_URL;
const veridaLoginText = process.env.VUE_APP_VERIDA_LOGO_URL;
const veridaContextName = process.env.VUE_APP_VERIDA_CONTEXT_NAME;
const veridaVaulContextName = process.env.VUE_APP_VERIDA_VAULT_CONTEXT_NAME;
const veridaTestnetDefaultDidServerUrl =
  process.env.VUE_APP_VERIDA_TESTNET_DEFAULT_DID_SERVER;

export const config = {
  nodeEnv,
  veridaEnv,
  veridaLogoUrl,
  veridaLoginText,
  veridaContextName,
  veridaVaulContextName,
  veridaTestnetDefaultDidServerUrl,
};
