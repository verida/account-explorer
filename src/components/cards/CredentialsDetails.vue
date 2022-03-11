<template>
  <div class="vc-details mt-3">
    <div class="vc-block">
      <div class="mr-2 vc-block-section">
        <h4 class="my-1">Credential Issued By</h4>
        <div class="vc-content">
          <div class="">
            <img
              v-if="credentialInfo.issuerProfile.avatar?.uri"
              alt="user-avatar"
              :src="credentialInfo.issuerProfile.avatar?.uri"
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
          <a :href="`/${credentialInfo.issuerProfile.did}`">
            Issuer Profile
            <img
              height="50"
              alt="user-avatar"
              class="mx-1"
              src="../../assets/images/arrow.svg"
          /></a>
        </p>
      </div>
      <div class="ml-2 vc-block-section">
        <h4 class="my-1">Credential Issued To</h4>
        <div class="vc-content">
          <div class="">
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
          <a :href="`/${credentialInfo.subjectProfile.did}`">
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
    <div class="">
      <h4 class="my-1">Re-Verify Credential</h4>
      <div class="profile-card-button mb-2">
        <qrcode-vue
          class="qr-img"
          :value="credentialInfo.publicUri"
          :size="150"
        />
      </div>
    </div>
  </div>
  <div class="mr-2">
    <verifiable-credential-display :schema="schema" :data="data" />
  </div>
  <div class="code-view">
    <div class="code-view-header px-1">
      <span>More Info</span>
      <div>
        <img
          v-if="isCodePreview"
          height="100"
          alt="user-avatar"
          @click="toggleView"
          src="../../assets/images/icon_up_arrow.svg"
        />
        <img
          v-else
          height="100"
          alt="user-avatar"
          @click="toggleView"
          src="../../assets/images/icon_down_arrow.svg"
        />
      </div>
    </div>
    <div v-show="isCodePreview" class="code-view-body">
      <pre>
          const CONTEXT_NAME = 'Verida: Sandbox Demo'
          const VERIDA_TESTNET_DEFAULT_SERVER = 'https://db.testnet.verida.io:5002/'

          const account = new window.VaultAccount({
            defaultDatabaseServer: {
                type: 'VeridaDatabase',
                endpointUri: VERIDA_TESTNET_DEFAULT_SERVER
            },
            defaultMessageServer: {
                type: 'VeridaMessage',
                endpointUri: VERIDA_TESTNET_DEFAULT_SERVER
            },
          })

          const context = await window.Network.connect({
            client: {
                environment: 'testnet'
            },
            account: account,
            context: {
                name: CONTEXT_NAME
            }
          })

          const did = await account.did()
          console.log("User is connected with DID: " + did)
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VerifiableCredentialDisplay from "vue-vc-display/";
import QrcodeVue from "qrcode.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "CredentialDetails",
  props: {
    profile: {},
  },
  components: { QrcodeVue, VerifiableCredentialDisplay },
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
