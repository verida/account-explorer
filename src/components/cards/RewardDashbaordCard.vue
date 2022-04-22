<template>
  <div :class="[`rewards rewards-${item.color}`]">
    <div class="rewards-icon">
      <img alt="union" :src="item.img" />
    </div>
    <div class="rewards-text">
      <span>{{ item.completed }}</span
      >/ <span>{{ item.total }}</span>
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RewardDashbaordCard",
  props: ["item"],
  components: {},
});
</script>
