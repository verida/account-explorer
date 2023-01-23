<template>
  <div class="profile">
    <div class="profile-card mt-2">
      <div class="mb-1 profile-card-img">
        <img
          v-if="profile.avatar?.uri"
          alt="user-avatar"
          :src="profile.avatar.uri"
        />
        <img v-else alt="user-avatar" src="@/assets/icons/icon_avatar.svg" />
        <h4 class="ml-1">{{ profile.name }}</h4>
      </div>
      <div class="profile-card-button mb-2">
        <add-contact />
        <qrcode-vue
          class="qr-img"
          :value="`${appBaseURL}/did/${profile.did}`"
          :size="200"
          level="H"
        />
      </div>
      <div class="profile-card-details">
        <h4>{{ profile.name }}</h4>
        <p>
          <span> DID:</span> {{ profile.did }}
          <img
            title="copy"
            @click="onCopy(profile.did)"
            alt="user-avatar"
            src="@/assets/icons/icon_copy.svg"
          />
        </p>
        <p><span>COUNTRY:</span> {{ profile.country }}</p>
        <p>
          <span>DESCRIPTION:</span> <br />
          {{ profile?.description }}
        </p>
        <div>
          <button class="button button-outlined mb-1 my-1" @click="toggleView">
            {{ isCodePreview ? "Close DID Document" : "Show DID Document" }}
          </button>
        </div>
      </div>
    </div>
    <div class="code-view">
      <div v-show="isCodePreview" class="code-view-body">
        <pre v-html="JSON.stringify(this.didDocument, null, 2)"></pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useClipboard from "vue-clipboard3";
import QrcodeVue from "qrcode.vue";
import { AddContact } from "@/components";
import { VeridaHelper } from "@/helpers";
import { config } from "@/config";

export default defineComponent({
  name: "Profile",
  props: {
    profile: {},
  },
  components: { QrcodeVue, AddContact },
  setup() {
    const { toClipboard } = useClipboard();

    const onCopy = async (did: string) => {
      try {
        await toClipboard(did);
      } catch (e) {
        console.error(e);
      }
    };

    return { onCopy };
  },
  data: () => ({
    appBaseURL: config.appBaseURL,
    isCodePreview: false,
    schema: {},
    data: {},
    didDocument: VeridaHelper.didDocument,
  }),

  methods: {
    toggleView() {
      this.isCodePreview = !this.isCodePreview;
    },
  },
});
</script>
