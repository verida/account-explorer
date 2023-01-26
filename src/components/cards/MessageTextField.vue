<template>
  <div class="message-card mt-2">
    <textarea
      placeholder="Write Message"
      name="message"
      id=""
      cols="30"
      rows="0"
    ></textarea>
    <img src="@/assets/icons/icon_send.svg" alt="message-icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageTextField",
});
</script>
