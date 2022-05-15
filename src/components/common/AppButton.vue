<template>
  <button
    :style="styles"
    :class="[`button button-${variant} ${fullWidth && 'button-fw'}`]"
  >
    <img v-if="startIcon && !isLoading" :src="startIcon" :alt="text" />
    <pulse-loader v-if="isLoading" :color="color" :loading="isLoading" />
    {{ text }}<slot> </slot>
    <img v-if="endIcon && !isLoading" :src="endIcon" :alt="text" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default defineComponent({
  name: "AppButton",
  props: {
    text: {
      required: false,
      default: "btn-logo",
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
