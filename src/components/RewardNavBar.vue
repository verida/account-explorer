<template>
  <div class="rewardNavBar">
    <div></div>
    <div class="rewardNavBar-item">
      <ul>
        <a href="#learn">Learn</a>
        <a href="#skills">Skills</a>
        <a href="#faqs">FAQs</a>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RewardNavBar",
  props: {
    profile: {},
  },
  data: () => ({
    open: false,
  }),
  components: {},
  methods: {},
});
</script>
