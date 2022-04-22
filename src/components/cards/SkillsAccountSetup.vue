<template>
  <div class="skillcard">
    <div class="skillcard-content">
      <div>
        <p>Project</p>
        <span class="chip chip-outlined">Verida</span>
      </div>
      <div>
        <p>Status</p>
        <span class="chip chip-secondary">NOT STARTED</span>
      </div>
      <div>
        <p>Rewards</p>
        <span class="chip chip-primary">300XP</span>
      </div>
      <button class="button button-primary">
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
