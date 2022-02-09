/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, Context, EnvironmentType } from "@verida/client-ts";
import { EventEmitter } from "events";
import { Profile } from "@/interface";
import { ClientConfig } from "@verida/client-ts/dist/interfaces";

const {
  VUE_APP_VERIDA_TESTNET_DEFAULT_DID_SERVER,
  VUE_APP_VAULT_CONTEXT_NAME,
} = process.env;

const userConfig = {
  environment: EnvironmentType.TESTNET,
  didServerUrl: VUE_APP_VERIDA_TESTNET_DEFAULT_DID_SERVER,
};

class VeridaHelper extends EventEmitter {
  private client: any;
  public profile?: Profile;
  public context: any;
  private did?: string;
  public connected?: boolean;
  on: any;

  constructor(config: ClientConfig) {
    super();
    this.client = new Client(config);
  }

  public async connect(context: Context): Promise<void> {
    this.context = context;
    this.did = await context.getAccount().did();

    if (this.context) {
      this.connected = true;
    }
  }

  async getProfile(did: string): Promise<boolean> {
    const profileInstance = await this.client.openPublicProfile(
      did,
      VUE_APP_VAULT_CONTEXT_NAME,
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

  public async sendMessage(messageData: any): Promise<boolean> {
    const type = "inbox/type/dataSend";
    const data = {
      data: [messageData],
    };
    const config = {
      recipientContextName: "Verida: Vault",
    };

    const messaging = await this.context.getMessaging();
    const subject = `New Contact: ${messageData.firstName}`;
    await messaging.send(this.did, type, data, subject, config);
    return true;
  }

  logout() {
    this.context = null;
    this.connected = false;
    this.did = "";
  }
}

const veridaHelper = new VeridaHelper(userConfig);

export default veridaHelper;
