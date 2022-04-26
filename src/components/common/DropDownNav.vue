<template>
  <div class="appDropdown">
    <div class="appDropdown-header">
      <div>
        <img :src="data.icon" alt="arrow_icon" />
        <span class="ml-1">{{ data.title }}</span>
      </div>
      <div class="" v-show="!hideToggleButton">
        <img
          src="../../assets/images/icon_angle_right.svg"
          alt="arrow_icon"
          v-if="open"
          @click="toggle"
        />
        <img
          v-else
          role="button"
          src="../../assets/images/icon_angle_down.svg"
          alt="arrow_icon"
          @click="toggle"
        />
      </div>
    </div>
    <div v-if="open" class="appDropdown-list ml-2">
      <ul v-for="item in data.items" :key="item" class="faqs-content">
        <li>
          <a href="/">{{ item }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DropDownNav",
  props: ["openSideNav", "data", "hideToggleButton"],
  data: () => ({
    open: true,
  }),
  components: {},
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
});
</script>
