<template>
  <v-expansion-panel
    popout
    v-if="codecs"
  >
    <v-expansion-panel-content
      v-for="codec in codecs"
      :key="codec._id"
      class="pa-2 elevation-1"
    >
      <div
        slot="header"
        class="title"
        :class="{'red--text': codec.error}"
      >
        <i
          class="fas fa-cloud"
          style="margin-right:10px"
          v-if="codec.cloud"
        ></i>
        <i
          class="fas fa-building"
          style="margin-right:10px"
          v-else
        ></i>
        {{ codec.name }}
      </div>
      <app-codec-details
        class="ml-4 mr-4"
        :codec="codec"
      ></app-codec-details>
      <v-layout justify-center>
        <v-btn
          fab
          dark
          color="teal"
          class="mb-3"
          @click="editCodec(codec)"
        >
          <v-icon dark>edit</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          color="orange"
          class="mb-3"
          @click="deleteCodec(codec)"
        >
          <v-icon dark>delete</v-icon>
        </v-btn>
        <v-btn
          dark
          fab
          color="info"
          @click="uploadZip(codec)"
        >
          <v-icon>unarchive</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          color="error"
          class="mb-3"
          @click="shutdownCodec(codec)"
        >
          <v-icon dark>mdi-power</v-icon>
        </v-btn>
      </v-layout>
    </v-expansion-panel-content>
    <v-dialog
      v-model="showDialogEdit"
      max-width="450"
    >
      <app-codec-edit
        :codec="codecSelected"
        @closeDialog="showDialogEdit = false"
      ></app-codec-edit>
    </v-dialog>
    <v-dialog
      v-model="showDialogDelete"
      max-width="400"
    >
      <app-codec-delete
        :codec="codecSelected"
        @closeDialog="showDialogDelete = false"
      ></app-codec-delete>
    </v-dialog>
    <v-dialog
      v-model="showDialogUpload"
      max-width="450"
    >
      <app-codec-upload
        :codec="codecSelected"
        @closeDialog="showDialogUpload = false"
      ></app-codec-upload>
    </v-dialog>
    <v-dialog
      v-model="showDialogShutdown"
      max-width="400"
    >
      <app-codec-shutdown
        :codec="codecSelected"
        @closeDialog="showDialogShutdown = false"
      ></app-codec-shutdown>
    </v-dialog>
  </v-expansion-panel>
</template>

<script>
import CodecDetails from "./CodecDetails.vue";
import CodecEdit from "./CodecEdit.vue";
import CodecDelete from "./CodecDelete.vue";
import CodecUpload from "./CodecUpload.vue";
import CodecShutdown from "./CodecShutdown.vue";

export default {
  data() {
    return {
      codecSelected: null,
      showDialogEdit: false,
      showDialogDelete: false,
      showDialogUpload: false,
      showDialogShutdown: false
    };
  },
  components: {
    appCodecDetails: CodecDetails,
    appCodecEdit: CodecEdit,
    appCodecDelete: CodecDelete,
    appCodecUpload: CodecUpload,
    appCodecShutdown: CodecShutdown
  },
  computed: {
    codecs() {
      return this.$store.getters.codecs;
    }
  },
  methods: {
    editCodec(codec) {
      this.codecSelected = codec;
      this.showDialogEdit = true;
    },
    deleteCodec(codec) {
      this.codecSelected = codec;
      this.showDialogDelete = true;
    },
    uploadZip(codec) {
      this.codecSelected = codec;
      this.showDialogUpload = true;
    },
    shutdownCodec(codec) {
      this.codecSelected = codec;
      this.showDialogShutdown = true;
    }
  }
};
</script>

