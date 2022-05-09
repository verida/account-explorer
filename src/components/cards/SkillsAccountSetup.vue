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
      <button class="button button-primary skillcard-content-button">
        <img src="../../assets/images/icon_check.svg" alt="arrow_icon" />
        Complete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const { VUE_APP_BASE_URL } = process.env;

export default defineComponent({
  name: "SkillsAccountSetup",
  props: {
    profile: {},
  },
  data: () => ({
    url: VUE_APP_BASE_URL,
  }),
  components: {},
  methods: {},
});
</script>
