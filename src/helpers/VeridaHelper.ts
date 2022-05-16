/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, Context, EnvironmentType, Utils } from "@verida/client-ts";
import { Credentials } from "@verida/verifiable-credentials";
import { DIDClient } from "@verida/did-client";
import { getClientContext } from "@verida/verifiable-credentials/dist/utils";
import { EventEmitter } from "events";
import { Profile } from "@/interface";
import { ClientConfig } from "@verida/client-ts/dist/interfaces";
import { Buffer } from "buffer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { config } from "@/config/config";

dayjs.extend(utc);

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
  public credentials: any;
  public didDocument: any;
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

  async getProfile(did: string): Promise<any> {
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
    return this.profile;
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

  public async getSchemaSpecs(schema: string, context: Context): Promise<any> {
    const schemas = await context.getClient().getSchema(schema);

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

  async readVerifiedCredential(uri: string) {
    const decodedURI = Buffer.from(uri, "base64").toString("utf8");

    const context = await getClientContext(decodedURI, EnvironmentType.TESTNET);

    const jwt = await Utils.fetchVeridaUri(decodedURI, context);

    const decodedPresentation = await Credentials.verifyPresentation(
      jwt as any,
      EnvironmentType.TESTNET
    );

    // Retrieve the verifiable credential within the presentation
    const verifiableCredential =
      decodedPresentation.verifiablePresentation.verifiableCredential[0];

    const issuerProfile = await this.getProfile(verifiableCredential.vc.sub);

    const subjectProfile = await this.getProfile(verifiableCredential.vc.sub);

    const schemaSpec = await this.getSchemaSpecs(
      verifiableCredential.credentialSubject.schema,
      context
    );

    const publicUri = `${window.origin}/credential?uri=${uri}`;

    return {
      publicUri,
      schemaSpec,
      issuerProfile,
      subjectProfile,
      verifiableCredential,
    };
  }
  async getDidDocument(did: string): Promise<void> {
    const didClient = new DIDClient(
      config.environments[EnvironmentType.TESTNET].didServerUrl
    );
    const didDocument = await didClient.get(did);
    const doc = didDocument?.export();

    console.log(doc);

    this.didDocument = doc;
  }

  logout() {
    this.context = null;
    this.connected = false;
    this.did = "";
  }
}

const veridaHelper = new VeridaHelper(userConfig);

export default veridaHelper;
