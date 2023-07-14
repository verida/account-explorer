<template>
  <h2>Recent Verida DID Registrations</h2>
  <pulse-loader v-if="loading" />
  <div class="recent-dids">
    <template v-bind:key="did" v-for="did in recentDIDList">
      <div class="recent-did-item">
        <router-link :to="'/did/' + did">{{ did }}</router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { getDIDs } from "@verida/vda-did-resolver";
import { defineComponent } from "vue";

export default defineComponent({
  name: "RecentDids",
  data() {
    return {
      recentDIDList: [] as string[],
      loading: true,
    };
  },

  mounted() {
    const NETWORK = "testnet";

    getDIDs(NETWORK, 100, 20).then((dids: string[]) => {
      const correctedDIDs = dids.map((did) => {
        if (!did.startsWith("did:")) {
          return `did:vda:testnet:${did}`;
        } else {
          return did;
        }
      });
      this.loading = false;
      this.recentDIDList = correctedDIDs;
    });
  },
});
</script>
