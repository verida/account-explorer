<template>
  <loading-icon color="#5761D7" :loading="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingIcon from "vue-spinner/src/PulseLoader.vue";

export default defineComponent({
  name: "PulseLoader",
  components: { LoadingIcon },
});
</script>
