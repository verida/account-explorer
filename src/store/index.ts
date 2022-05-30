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
        await veridaHelper.getProfile(did);
        await veridaHelper.getDidDocument(did);
        commit("setProfile", veridaHelper.profile);
      } catch (error) {
        console.log(error);

        commit("setError", "DID not found");
      }
    },
  },
  modules: {},
});
