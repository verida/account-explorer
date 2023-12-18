import { EnvironmentType } from "@verida/types";

const nodeEnv = process.env.NODE_ENV || "development";

console.log(process.env.VUE_APP_VERIDA_ENV);

const veridaEnv: EnvironmentType = <EnvironmentType>(
  process.env.VUE_APP_VERIDA_ENV
);

const veridaLogoUrl = process.env.VUE_APP_VERIDA_LOGO_URL;
const veridaLoginText = process.env.VUE_APP_VERIDA_LOGO_URL;
const veridaContextName = process.env.VUE_APP_VERIDA_CONTEXT_NAME;
const veridaVaultContextName = process.env.VUE_APP_VERIDA_VAULT_CONTEXT_NAME;
const veridaNodeSummaryUrl = process.env.VUE_APP_NODE_SUMMARY_URL;
const veridaNetworkStatusUrl = process.env.VUE_APP_NETWORK_STATUS_URL;
const veridaTestnetDefaultDidServerUrl =
  process.env.VUE_APP_VERIDA_TESTNET_DEFAULT_DID_SERVER;
const veridaExplorerUrls = {
  mainnet: process.env.VUE_APP_EXPLORER_URL_MAINNET,
  testnet: process.env.VUE_APP_EXPLORER_URL_TESTNET,
};

console.log(veridaExplorerUrls);

export const config = {
  nodeEnv,
  veridaEnv,
  veridaLogoUrl,
  veridaLoginText,
  veridaContextName,
  veridaVaultContextName,
  veridaTestnetDefaultDidServerUrl,
  veridaNodeSummaryUrl,
  veridaNetworkStatusUrl,
  veridaExplorerUrls,
};
