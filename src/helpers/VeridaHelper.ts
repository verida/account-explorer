/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/config";
import { CREDENTIAL } from "@/constant";
import { Profile } from "@/interface";
import { Client, Context } from "@verida/client-ts";
import { decodeUri, fetchVeridaUri } from "@verida/helpers";
import { IMessaging } from "@verida/types";
import { Credentials } from "@verida/verifiable-credentials";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { EventEmitter } from "events";

dayjs.extend(utc);

const userConfig = {
  environment: config.veridaEnv,
  didServerUrl: config.veridaTestnetDefaultDidServerUrl,
};

class VeridaClient extends EventEmitter {
  private client: Client;
  public profile?: Profile;
  public context: Context | undefined;
  private did: string;
  public connected?: boolean;
  public credentials: any;
  public didDocument: any;
  private _messagingInstance: IMessaging | undefined;
  on: any;

  constructor(config: typeof userConfig) {
    super();
    this.client = new Client(config);
    this.did = "";
    this.context = undefined;
  }

  public async connect(context: Context): Promise<void> {
    this.context = context;
    this.did = await context.getAccount().did();

    if (this.context) {
      this.connected = true;
    }
  }

  async getProfileStateless(did: string, contextName?: string): Promise<any> {
    const profileContextName =
      contextName || (config.veridaVaultContextName as string);

    const profileConnection = await this.client.openPublicProfile(
      did,
      profileContextName,
      "basicProfile"
    );

    if (profileConnection) {
      const profile = await profileConnection.getMany({}, {});
      profile.did = did;

      return profile;
    } else {
      return undefined;
    }
  }

  async getProfile(did: string, contextName?: string): Promise<any> {
    this.profile = await this.getProfileStateless(did, contextName);

    return this.profile;
  }

  private async initialiseMessagingInstance(): Promise<IMessaging> {
    if (!this.context) {
      throw new Error("No app context");
    }
    if (this._messagingInstance) {
      return this._messagingInstance;
    }
    this._messagingInstance = await this.context.getMessaging();
    return this._messagingInstance;
  }

  public async sendMessage(messageData: any): Promise<boolean> {
    const type = "inbox/type/dataSend";
    const data = {
      data: [messageData],
    };
    const messageConfig = {
      did: this.did,
      recipientContextName: config.veridaVaultContextName,
    };

    const messaging = await this.initialiseMessagingInstance();
    const subject = `New Contact: ${messageData.firstName}`;
    await messaging.send(this.did, type, data, subject, messageConfig);
    return true;
  }

  public async getSchemaSpecs(schema: string): Promise<any> {
    const schemas = await this.client.getSchema(schema);

    const json = await schemas.getSpecification();

    return json;
  }

  hasCredentialExpired(credentials: any): boolean {
    const vc = credentials.verifiableCredential;
    if (vc.expirationDate) {
      // Ensure credential hasn't expired
      const now = dayjs(new Date().toISOString()).utc(true);
      const expDate = dayjs(vc.expirationDate).utc(true);

      if (expDate.diff(now) < 0) {
        return true;
      }
    }
    return false;
  }

  async readVerifiedCredential(encodedUri: string) {
    const veridaUri = decodeUri(encodedUri);
    const jwt = await fetchVeridaUri(veridaUri, this.client);

    const decodedPresentation = await Credentials.verifyPresentation(jwt, {});

    // Retrieve the verifiable credential within the presentation
    const verifiableCredential =
      decodedPresentation.verifiablePresentation.verifiableCredential[0];

    let veridaContextName;

    //TODO:  This is a temporary fix , see reference ticket  https://github.com/verida/verida-js/issues/207
    if (
      verifiableCredential.vc.veridaContextName === "Verida: Credential Manager"
    ) {
      veridaContextName = verifiableCredential.vc.veridaContextName;
    }

    const issuerProfile = await this.getProfile(
      verifiableCredential.vc.issuer,
      veridaContextName
    );

    const subjectProfile = await this.getProfile(verifiableCredential.vc.sub);

    const schemaSpec = await this.getSchemaSpecs(
      verifiableCredential.credentialSchema.id
    );

    const publicUri = `${window.origin}/${CREDENTIAL}?uri=${encodedUri}`;

    return {
      publicUri,
      schemaSpec,
      issuerProfile,
      subjectProfile,
      verifiableCredential,
    };
  }
  async getDidDocument(did: string): Promise<void> {
    const didClient = this.client.didClient;
    const document = await didClient.get(did);
    this.didDocument = document;
  }

  logout(): void {
    this.context = undefined;
    this.connected = false;
    this.did = "";
    this.didDocument = undefined;
    this.credentials = undefined;
    this._messagingInstance = undefined;
  }

  public reset(): void {
    this.did = "";
    this.profile = undefined;
    this.didDocument = undefined;
    this.credentials = undefined;
  }
}

const VeridaHelper = new VeridaClient(userConfig);

export { VeridaHelper };
