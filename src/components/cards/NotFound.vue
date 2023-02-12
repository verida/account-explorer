<template>
  <div class="not-found">
    <img alt="not-found" src="@/assets/images/notfound.svg" />
    <p>Sorry, we can’t find the page you’re looking for!</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound",
  components: {},
});
</script>
