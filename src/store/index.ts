import veridaHelper from "@/helpers/VeridaHelper";
import { createStore } from "vuex";

export default createStore({
  state: {
    profile: {},
  },
  mutations: {
    updateProfile(state, profile) {
      // console.log(profile);

      state.profile = profile;
    },
  },
  actions: {
    async fetchProfile({ commit }, did: string) {
      try {
        await veridaHelper.getProfile();
      } catch (error) {
        const profile = {
          did: did,
          name: "mike",
        };
        commit("updateProfile", profile);
      }
    },
  },
  modules: {},
});
