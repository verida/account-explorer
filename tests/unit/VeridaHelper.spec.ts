/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */

// ref: https://github.com/jsdom/jsdom/issues/2524

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
  "dmVyaWRhOi8vZGlkOnZkYToweEIzNzI5OTgyQTI1ODU1NDRGRDcyYzk5Q0YzNzczYTljNmJhQkQ1NWMvR3BORGVQdldVNFJRdWQ5amFaSmlOd0Z5QVMvY3JlZGVudGlhbF9wdWJsaWNfZW5jcnlwdGVkL2EwYTA5ODIwLWRhNzktMTFlYy05NzMyLWQ1YzA4M2FiZWNhMj9rZXk9YWY0N2ViMzk4OWU3NDlkYzg2NTBjZjgzZWFlN2FiZGNhZWMzZGQ0NDVkMTkzYzE0ZGM4MjVmOTIxODc5MzI2Yg==";

jest.setTimeout(30000);

describe("Test for Verida helper Logic", () => {
  describe("Test for user profile", () => {
    it.todo("Opens public profile correctly", async () => {
      // // const result = await VeridaClient.getProfile(
      // //   "did:vda:0x798aCB521757ffd91622c78a9bB119f416de993C",
      // //   "Verida: Vault"
      // // );
      // const profileInstance = await new Client(userConfig).openPublicProfile(
      //   "did:vda:0x798aCB521757ffd91622c78a9bB119f416de993C",
      //   "Verida: Vault"
      // );
      // const result = await profileInstance?.getMany({}, {});
      // console.log(result);
      // expect(result.did).toBe(DID);
    });
    it("Get Profile DID Document", async () => {
      await VeridaClient.getDidDocument(DID);

      expect(VeridaClient.didDocument.id).toBe(DID);
    });
  });

  describe("Test for verifiable credential data", () => {
    it("If verifiable credential data has expired", async () => {
      const hasExpired = VeridaClient.hasCredentialExpired(SAMPLE_VC_DATA);
      console.log(hasExpired);
      expect(hasExpired).toBeFalsy();
    });
  });
});
