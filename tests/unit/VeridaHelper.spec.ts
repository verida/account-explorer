/* eslint-disable */


//@ts-ignore
global.TextEncoder = require("util").TextEncoder;
//@ts-ignore
global.TextDecoder = require("util").TextDecoder;

import VeridaClient from "../../src/helpers/VeridaHelper";

const SAMPLE_VC_DATA = {
  sub: "did:vda:0x476Fa00518971FCC0b7B342F4b43e5f9892Cbbf8",
  issuer: "did:vda:0xB3729982A2585544FD72c99CF3773a9c6baBD55c",
  veridaContextName: "Verida: Credentials",
  issuanceDate: "2022-05-23T09:20:44.301Z",
  expirationDate: "2060-02-14T04:27:05.467Z",
};
const DID = "did:vda:0x798acb521757ffd91622c78a9bb119f416de993c";
const VERIDA_URI =
  "dmVyaWRhOi8vZGlkOnZkYToweEI1QUFFQmI3M2RmODAwNWM5OEQ1NTYyOTNmNTA5ZmQzQTM3YmFCNGEvOENObVI1TDlZZGZBWW1mM2tYL2NyZWRlbnRpYWxfcHVibGljX2VuY3J5cHRlZC83ZTdmNWNjMC1kYjUyLTExZWMtOTlkMS05ZGI0YmZlYjU3MjA/a2V5PTI5YWU3NGYyZjk1NTAwM2QzMjAwOGYzMjJlOWE4ZTE3YTFiZDdhYmVhODUyMzMwNjAwYWY1ZWM0ZWU2ZWRjN2Y=";

jest.setTimeout(90000);

describe("Test for Verida helper Logic", () => {
  describe("Test for user profile", () => {
    it("Opens public profile correctly", async () => {
      const result = await VeridaClient.getProfile(DID, "Verida: Vault");
      expect(result.did).toBe(DID);
    });
    it("Get Profile DID Document", async () => {
      await VeridaClient.getDidDocument(DID);

      expect(VeridaClient.didDocument.id).toBe(DID);
    });
  });

  describe("Test for verifiable credential data", () => {
    // it("If verifiable credential is verified correctly", async () => {
    //   const result = await VeridaClient.readVerifiedCredential(VERIDA_URI);
    //   console.log(result);
    // });
    it("If verifiable credential data has expired", async () => {
      const hasExpired = VeridaClient.hasCredentialExpired(SAMPLE_VC_DATA);
      console.log(hasExpired);
      expect(hasExpired).toBeFalsy();
    });
  });
});
