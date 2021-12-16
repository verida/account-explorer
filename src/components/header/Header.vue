<template>
  <header class="header">
    <router-link to="/">
      <img alt="Vue logo" src="../../assets/images/logoverida.svg"
    /></router-link>

    <div class="login-section">
      <span>Login with Verida</span>
      <img alt="Vue logo" src="../../assets/images/arrow.svg" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>
