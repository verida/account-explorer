<template>
  <button
    :style="styles"
    :class="[`button button-${variant} ${fullWidth && 'button-fw'}`]"
  >
    <img v-if="startIcon && !isLoading" :src="startIcon" :alt="title" />
    <pulse-loader v-if="isLoading" :color="color" :loading="isLoading" />
    <slot v-else> {{ text }}</slot>
    <img v-if="endIcon && !isLoading" :src="endIcon" :alt="title" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default defineComponent({
  name: "Accordion",
  props: {
    text: {
      required: true,
    },
    variant: {
      required: true,
    },
    isLoading: {
      require: false,
      type: Boolean,
    },
    fullWidth: {
      required: false,
    },
    startIcon: {
      required: false,
      type: String,
    },
    endIcon: {
      required: false,
      type: String,
    },
    styles: {
      type: CSSStyleSheet,
      require: false,
    },
  },
  components: { PulseLoader },
  data: () => ({
    color: "",
  }),
  beforeMount() {
    switch (this.variant) {
      case "primary":
        this.color = "#ffff";
        break;
      case "outlined":
        this.color = "#000";
        break;
      default:
        this.color = "#423BCE";
        break;
    }
  },
});
</script>
