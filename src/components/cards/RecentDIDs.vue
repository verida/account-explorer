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
import { VeridaHelper } from "@/helpers";
import { getDIDs } from "@verida/vda-did-resolver";
import { defineComponent } from "vue";

// for reasons I don't entirely understand
// this fails to resolve PulseLoader:
//    import {PulseLoader} from "@/components"
// *except when doing hot reload* (??!!)
// whereas:
//     import PulseLoader from "@/components/PulseLoader.vue";
// works.
// I believe it may be a circular dependency issue
// but haven't been able to track it down.
// https://stackoverflow.com/questions/42170276/imported-vue-component-only-registered-on-webpack-hot-reload
// suggested this fix which works (??)
import PulseLoader from "@/components/PulseLoader.vue";

export default defineComponent({
  name: "RecentDids",
  components: { PulseLoader },
  data() {
    return {
      recentDIDList: [] as string[],
      loading: true,
    };
  },

  mounted() {
    const NETWORK = "testnet";
    console.log(`loading: ${this.loading}`)

    getDIDs(NETWORK, 0, 20).then((dids: string[]) => {
      const correctedDIDs = dids.map((did) => {
        if (!did.startsWith("did:")) {
          return `did:vda:testnet:${did}`;
        } else {
          return did;
        }
      });

      for (const did of correctedDIDs) {
        VeridaHelper.getProfileStateless(did)
          .then((profile) => {
            this.recentDIDList.push(profile.did);

            this.loading = false;
          })
          .catch((e) => {
            console.warn(e.message);
          });
      }
    });
  },
});
</script>