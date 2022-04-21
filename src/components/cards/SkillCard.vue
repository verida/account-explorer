<template>
  <div class="skills">
    <div class="skills-icon">
      <img src="../../assets/images/icon_skill_user.svg" alt="arrow_icon" />
      <img src="../../assets/images/arrow.svg" alt="arrow_icon" />
    </div>
    <div class="skills-title">
      <h4>Set up your Verida Vault account</h4>
    </div>
    <div class="skills-bottom-bar">
      <span class="chip chip-secondary">NOT STARTED</span>
      <span class="chip chip-primary ml-2">100 XP</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const { VUE_APP_BASE_URL } = process.env;

export default defineComponent({
  name: "SkillCard",
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
