<template>
  <div class="profile">
    <div class="profile-card mt-2">
      <div class="mb-1 profile-card-img">
        <img
          v-if="profile.avatar?.uri"
          alt="user-avatar"
          :src="profile.avatar.uri"
        />
        <img v-else alt="user-avatar" src="../../assets/images/avatar.svg" />
        <h4 class="ml-1">{{ profile.name }}</h4>
      </div>
      <div class="profile-card-button mb-2">
        <add-contact />
        <qrcode-vue class="qr-img" :value="profile.did" :size="150" />
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
import QrcodeVue from "qrcode.vue";
import AddContact from "@/components/AddContact.vue";

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
  components: { QrcodeVue, AddContact },
  methods: {},
});
</script>
