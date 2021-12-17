<template>
  <div class="profile">
    <div class="profile-card mt-2">
      <div class="mb-1 profile-card-img">
        <img alt="user-avatar" :src="profile?.avatar?.uri" />
        <h4 class="ml-1">{{ profile.name }}</h4>
      </div>
      <div class="profile-card-button mb-2">
        <button class="button button-outlined mb-1">Add as Contact</button>
        <img alt="user-avatar" src="../../assets/images/qr.svg" />
      </div>

      <div class="profile-card-details">
        <h4>{{ profile.name }}</h4>
        <p>
          <span> DID:</span> {{ profile.did }}
          <img
            @click="onCopy(profile.did)"
            alt="user-avatar"
            src="../../assets/images/icon_copy.svg"
          />
        </p>
        <p><span>COUNTRY:</span> {{ profile.country }}</p>
        <p>
          <span>DESCRIPTION:</span> <br />
          {{ profile?.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useClipboard from "vue-clipboard3";

export default defineComponent({
  name: "Profile",
  props: {
    profile: {},
  },
  setup() {
    const { toClipboard } = useClipboard();

    const onCopy = async (did: string) => {
      try {
        await toClipboard(did);
        console.log("Copied to clipboard");
      } catch (e) {
        console.error(e);
      }
    };

    return { onCopy };
  },
  data: () => ({
    message: "hello man",
  }),
  components: {},
  methods: {},
});
</script>
