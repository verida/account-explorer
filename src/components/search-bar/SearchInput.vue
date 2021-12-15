<template>
  <div class="search-input">
    <div class="search-input-section">
      <img src="../../assets/images/icon_search.svg" alt="icon_search" />
      <input type="text" placeholder="search...." />
    </div>

    <img
      v-if="didSearch"
      class="search-input-close"
      src="../../assets/images/icon_close.svg"
      alt="arrow_icon"
    />
    <button v-else class="button search-input-button">
      <span>Search</span>
      <img src="../../assets/images/arrow.svg" alt="arrow_icon" />
    </button>
  </div>
  <button
    v-show="!didSearch"
    class="search-btn button button-block button-fw my-1"
  >
    <span>Search</span>
    <img src="../../assets/images/arrow.svg" alt="arrow_icon" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchInput",
  props: {
    didSearch: Boolean,
  },
});
</script>
