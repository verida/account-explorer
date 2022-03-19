<template>
  <div :class="['status-card', type, 'mt-2']">
    <div class="mx-1">
      <img :src="message[type].image" alt="type-image" />
    </div>
    <div>
      <h4 class="pb-1">{{ message[type].title }}</h4>
      <span>{{ message[type].caption }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StatusPanel",
  props: {
    type: {
      type: String,
      required: true,
      default: "success",
    },
  },
  data() {
    return {
      message: {
        success: {
          title: "Credential is Valid",
          caption: ``,
          image: require("../../assets/images/icon_success.svg"),
        },
        invalid: {
          title: "This is an invalid credential",
          caption: `If you are checking this credential request the person presenting the credential try again with a new credential. 
                  If you are the credential holder please contact . `,
          image: require("../../assets/images/icon_invalid.svg"),
        },
        warning: {
          title: "Expired Credential",
          caption: "",
          image: require("../../assets/images/icon_warning.svg"),
        },
      },
    };
  },
});
</script>
