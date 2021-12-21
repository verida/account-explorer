import { Client, EnvironmentType, Network } from "@verida/client-ts";
import { EventEmitter } from "events";
import { hasSession, VaultAccount } from "@verida/account-web-vault";
import { Profile } from "@/interface";
import { ClientConfig } from "@verida/client-ts/dist/interfaces";

const {
  VUE_APP_CONTEXT_NAME,
  VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
  VUE_APP_VERIDA_TESTNET_DEFAULT_DID_SERVER,
  VUE_APP_VAULT_CONTEXT_NAME,
  VUE_APP_LOGO_URL,
} = process.env;

const userConfig = {
  environment: EnvironmentType.TESTNET,
  didServerUrl: VUE_APP_VERIDA_TESTNET_DEFAULT_DID_SERVER,
};

class VeridaHelper extends EventEmitter {
  private client: Client;
  public profile?: Profile;
  private context: any;
  private account: any;
  public did?: string;
  public connected?: boolean;
  on: any;

  constructor(config: ClientConfig) {
    super();
    this.client = new Client(config);
  }

  public async connect(): Promise<void> {
    this.account = new VaultAccount({
      defaultDatabaseServer: {
        type: "VeridaDatabase",
        endpointUri: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER as string,
      },
      defaultMessageServer: {
        type: "VeridaMessage",
        endpointUri: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER as string,
      },
      vaultConfig: {
        request: {
          logoUrl: VUE_APP_LOGO_URL,
        },
      },
    });

    this.context = await Network.connect({
      client: {
        environment: EnvironmentType.TESTNET,
      },
      account: this.account,
      context: {
        name: VUE_APP_CONTEXT_NAME as string,
      },
    });

    this.did = await this.account.did();

    this.connected = true;

    this.emit("connected", this.connected);
  }

  async autoLogin() {
    const isLoggedIn = hasSession(VUE_APP_CONTEXT_NAME);

    if (isLoggedIn) {
      await this.connect();
      return true;
    }
    return false;
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
    const subject = "Contact Details";
    const res = await messaging.send(this.did, type, data, subject, config);
    console.log(res);
    return true;
  }

  async logout(): Promise<void> {
    await this.context.getAccount().disconnect(VUE_APP_CONTEXT_NAME);
    this.context = null;
    this.account = null;
    this.connected = false;
    this.did = "";
  }
}

const veridaHelper = new VeridaHelper(userConfig);

export default veridaHelper;
