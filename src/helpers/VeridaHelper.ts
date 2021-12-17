import { Client, EnvironmentType } from "@verida/client-ts";
import { Profile } from "@/interface";

const { VUE_APP_CONTEXT_NAME, VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER } =
  process.env;

const userConfig = {
  environment: EnvironmentType.TESTNET,
  didServerUrl: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
};

class VeridaHelper {
  client: Client;
  profile?: Profile;

  constructor() {
    this.client = new Client(userConfig);
  }

  async getProfile(did: string): Promise<boolean> {
    const profileInstance = await this.client.openPublicProfile(
      did,
      VUE_APP_CONTEXT_NAME,
      "basicProfile"
    );

    if (profileInstance) {
      this.profile = await profileInstance.getMany({}, {});
      if (this.profile) {
        this.profile.did = did;
      }
    }

    return true;
  }
}

const veridaHelper = new VeridaHelper();

export default veridaHelper;
