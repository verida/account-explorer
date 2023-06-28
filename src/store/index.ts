/* eslint-disable @typescript-eslint/no-explicit-any */
import { VeridaHelper } from "@/helpers";
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
      if (did) {
        commit("setLoader", true);
        try {
          await VeridaHelper.getDidDocument(did);
          await VeridaHelper.getProfile(did);
          commit("setProfile", VeridaHelper.profile);
        } catch (error: any) {
          // Check if DID document was found
          if (VeridaHelper.didDocument) {
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
      } else {
        // probably used the back button. Reset state
        VeridaHelper.reset();
        commit("setProfile", {});
      }
    },
  },
  modules: {},
});
