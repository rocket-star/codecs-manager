<template>
  <v-card>
    <v-card-title class="headline">Uploader un zip (macros, config)</v-card-title>
    <v-card-text class="pl-5 pr-5 text-xs-center">
      <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        class="mb-3"
        :options="dropzoneOptions"
        v-on:vdropzone-success="dropzoneComplete"
      ></vue-dropzone>
      <v-btn
        color="primary"
        flat="flat"
        @click="restoreConfig"
        :loading="loading"
      >
        Restaurer la config par défaut
      </v-btn>
      <v-alert
        :value="true"
        type="success"
        v-for="result in results"
        :key="result"
      >
        {{ result.Message }}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="info"
        flat="flat"
        @click="closeDialog"
      >
        Annuler
      </v-btn>
      <v-btn
        color="success"
        flat="flat"
        @click="processQueue"
        :loading="loading"
      >
        Uploader
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import CryptoJS from "crypto-js";

export default {
  props: ["codec"],
  data() {
    return {
      loading: false,
      results: null,
      timeout: 0,
      dropzoneOptions: {
        url: "/codecs/uploadFile",
        addRemoveLinks: true,
        thumbnailWidth: 150,
        maxFilesize: 10,
        maxFiles: 1,
        autoProcessQueue: false,
        dictDefaultMessage: "Déposer votre zip ici"
      }
    };
  },
  computed: {
    codecs() {
      return this.$store.getters.codecs;
    }
  },
  methods: {
    restoreConfig() {
      this.loading = true;
      this.$store
        .dispatch("restoreConfig", {
          _id: this.codec._id
        })
        .then(response => {
          this.results = response.data.result.Successes;
          this.loading = false;

          setTimeout(() => {
            this.clear();
          }, 5000);
        });
    },
    closeDialog() {
      this.clear();
      this.$emit("closeDialog");
    },
    submit() {
      var filename =
        "http://websrv2:15161/uploads/" +
        this.$refs.myVueDropzone.getAcceptedFiles()[0].name;

      this.readFile(this.$refs.myVueDropzone.getAcceptedFiles()[0])
        .then(this.printHash)
        .then(checksum => {
          this.loading = true;
          this.$store
            .dispatch("uploadZip", {
              _id: this.codec._id,
              filename: filename,
              checksum: checksum
            })
            .then(result => {
              this.results = result.data.result.Successes;
              this.loading = false;

              setTimeout(() => {
                this.clear();
              }, 5000);
            })
            .catch(err => {
              alert(err);
            });
        });
    },
    clear() {
      this.results = null;
    },
    readFile(blob) {
      var reader = new FileReader();
      return new Promise((rv, re) => {
        reader.readAsBinaryString(blob);
        reader.addEventListener("load", function() {
          rv(reader.result);
        });
      });
    },
    printHash(data) {
      return new Promise((rv, re) => {
        rv(CryptoJS.SHA512(CryptoJS.enc.Latin1.parse(data)).toString());
      });
    },
    dropzoneComplete() {
      this.submit();
    },
    processQueue() {
      this.$refs.myVueDropzone.processQueue();
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  }
};
</script>

<style>
</style>
