<template>
  <div :class="[`rewards rewards-${type}`]">
    <div class="rewards-icon">
      <img alt="union" src="../../assets/images/icon_union.svg" />
    </div>
    <div class="rewards-text">
      <span>0</span>/ <span>800</span>
      <p>Number of XP earned</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RewardDashbaordCard",
  props: ["type"],
  components: {},
  beforeMount() {
    console.log(this.type);
  },
});
</script>
