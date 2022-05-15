<template>
  <div class="skillcard">
    <h4 class="skill-setup-title-mobile">Set up your Verida Vault account</h4>
    <div class="skillcard-content">
      <div class="skillcard-content-project">
        <p>Project</p>
        <span class=""
          ><img
            height="15"
            alt="Vue logo"
            src="../../assets/images/logoverida.svg"
        /></span>
      </div>
      <div>
        <p>Status</p>
        <span class="chip chip-secondary">NOT STARTED</span>
      </div>
      <div>
        <p>Rewards</p>
        <span class="chip chip-primary">300XP</span>
      </div>
      <button
        class="button button-primary skillcard-content-button"
        @click="$emit('claimPoints', (did, rewardType))"
      >
        <pulse-loader color="#fff" :loading="isLoading" />
        <img
          v-if="!isLoading"
          src="../../assets/images/icon_check.svg"
          alt="arrow_icon"
        />
        <span v-if="!isLoading"> Complete</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const { VUE_APP_BASE_URL } = process.env;

export default defineComponent({
  name: "SkillsAccountSetup",
  emits: ["claimPoints"],
  props: {
    rewardType: String,
    isLoading: Boolean,
  },
  data: () => ({
    url: VUE_APP_BASE_URL,
    did: "did:vda:0x991546Ee69f83076c70aAdA37B04e5a10a004B4b",
  }),
  components: { PulseLoader },
  methods: {},
});
</script>
