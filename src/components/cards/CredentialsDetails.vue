<template>
  <div class="vc-credential">
    <accordion class="mt-2 qr-mobile" title="Re-Verify Credential">
      <qrcode-vue
        class="qr-img ml-1 my-1"
        :value="credentialInfo.publicUri"
        :size="150"
      />
    </accordion>
    <div class="vc-details mt-3">
      <div class="vc-block">
        <div class="mr-2 vc-block-section">
          <h4 class="my-1">Credential Issued By</h4>
          <div class="vc-content">
            <div>
              <img
                v-if="credentialInfo.issuerProfile?.avatar?.uri"
                alt="user-avatar"
                :src="credentialInfo.issuerProfile?.avatar?.uri"
              />
              <img
                v-else
                height="100"
                alt="user-avatar"
                src="../../assets/images/avatar.svg"
              />
            </div>
            <div class="vc-content-details mx-1">
              <p class="my-1">{{ credentialInfo.issuerProfile.name }}</p>
              <p>
                <span> DID:</span>
                {{ truncateDID(credentialInfo.issuerProfile.did) }}
              </p>
            </div>
          </div>
          <p class="mt-1">
            <a :href="`/did/${credentialInfo.issuerProfile.did}`">
              Issuer Profile
              <img
                height="50"
                alt="user-avatar"
                src="../../assets/images/arrow.svg"
            /></a>
          </p>
        </div>
        <div class="ml-2 vc-block-section">
          <h4 class="my-1">Credential Issued To</h4>
          <div class="vc-content">
            <div>
              <img
                v-if="credentialInfo.subjectProfile.avatar?.uri"
                alt="user-avatar"
                :src="credentialInfo.subjectProfile.avatar?.uri"
              />
              <img
                v-else
                height="100"
                alt="user-avatar"
                src="../../assets/images/avatar.svg"
              />
            </div>
            <div class="vc-content-details mx-1">
              <p class="my-1">{{ credentialInfo.subjectProfile.name }}</p>
              <p>
                <span> DID:</span>
                {{ truncateDID(credentialInfo.subjectProfile.did) }}
              </p>
            </div>
          </div>
          <p class="mt-1">
            <a :href="`/did/${credentialInfo.subjectProfile.did}`">
              Credential Holder Profile
              <img
                height="50"
                alt="user-avatar"
                class="mx-1"
                src="../../assets/images/arrow.svg"
            /></a>
          </p>
        </div>
      </div>
      <div>
        <h4 class="my-1">Re-Verify Credential</h4>
        <div class="profile-card-button mb-2">
          <qrcode-vue
            class="qr-img"
            :value="credentialInfo.publicUri"
            :size="200"
            level="H"
          />
        </div>
      </div>
    </div>
    <div class="mr-3">
      <verifiable-credential-display :schema="schema" :data="data" />
    </div>
    <accordion title="More Info">
      <pre>
          {{ JSON.stringify(credentialInfo.verifiableCredential, null, 2) }}
      </pre>
    </accordion>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Accordion from "../Accordion.vue";
import VerifiableCredentialDisplay from "@verida/vue-credentials-view";
import QrcodeVue from "qrcode.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "CredentialDetails",
  props: {
    profile: {},
  },
  components: { QrcodeVue, VerifiableCredentialDisplay, Accordion },
  data: () => ({
    isCodePreview: false,
    schema: {},
    data: {},
  }),
  computed: {
    ...mapState(["credentialInfo"]),
  },
  beforeMount() {
    if (this.credentialInfo?.verifiableCredential) {
      this.data = this.credentialInfo.verifiableCredential.credentialSubject;
      this.schema = this.credentialInfo.schemaSpec;
    }
  },
  methods: {
    toggleView() {
      this.isCodePreview = !this.isCodePreview;
    },
    truncateDID(did: string) {
      return did && did.slice(0, 13);
    },
  },
});
</script>
