/* eslint-disable @typescript-eslint/no-explicit-any */
import veridaHelper from "@/helpers/VeridaHelper";
import { createStore } from "vuex";

export default createStore({
  state: {
    profile: {},
    error: "",
    loader: false,
    connected: false,
    credentialInfo: null,
  },
  mutations: {
    setProfile(state, profile) {
      state.error = "";
      state.profile = profile;
      state.loader = false;
    },
    setError(state, error) {
      state.error = error;
      state.profile = {};
      state.loader = false;
    },
    setCredential(state, data) {
      state.credentialInfo = data;
    },
    setStatus(state, status) {
      state.connected = status;
    },
    setLoader(state, type) {
      state.loader = type;
    },
  },
  actions: {
    async fetchProfile({ commit }, did: string) {
      commit("setLoader", true);
      try {
        await veridaHelper.getDidDocument(did);
        await veridaHelper.getProfile(did);
        commit("setProfile", veridaHelper.profile);
      } catch (error: any) {
        // Check if DID document was found
        if (veridaHelper.didDocument) {
          commit("setProfile", {
            name: "unknown",
            avatar: { uri: "" },
            country: "",
            did,
          });
        } else {
          commit("setError", error.message);
        }
      }
    },
  },
  modules: {},
});
