import { Client, EnvironmentType } from "@verida/client-ts";

const { VUE_APP_CONTEXT_NAME, VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER } =
  process.env;

const userConfig = {
  environment: EnvironmentType.TESTNET,
  didServerUrl: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
};

class VeridaHelper {
  client: Client;

  constructor() {
    this.client = new Client(userConfig);
  }

  async getProfile() {
    const did = "did:vda:0x798aCB521757ffd91622c78a9bB119f416de993C";
    const profile = await this.client.openPublicProfile(
      did,
      VUE_APP_CONTEXT_NAME,
      "basicProfile"
    );
    return profile;
  }
}

const veridaHelper = new VeridaHelper();

export default veridaHelper;
