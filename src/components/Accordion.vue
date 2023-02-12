<template>
  <div class="code-view">
    <div class="code-view-header px-1">
      <h4>{{ title }}</h4>
      <div>
        <img
          v-if="isCodePreview"
          height="100"
          alt="user-avatar"
          @click="toggleView"
          src="@/assets/icons/icon_up_arrow.svg"
        />
        <img
          v-else
          height="100"
          alt="user-avatar"
          @click="toggleView"
          src="@/assets/icons/icon_down_arrow.svg"
        />
      </div>
    </div>
    <div v-show="isCodePreview" class="code-view-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Accordion",
  props: {
    title: {
      required: true,
    },
    view: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    isCodePreview: false,
    schema: {},
    data: {},
  }),
  methods: {
    toggleView() {
      this.isCodePreview = !this.isCodePreview;
    },
  },
});
</script>
