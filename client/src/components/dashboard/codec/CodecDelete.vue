<template>
  <v-card>
    <v-card-title class="headline">Etes-vous sûr de vouloir supprimer ce codec ?</v-card-title>

    <v-card-text>
      Cette action est irréversible.
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
        @click="deleteCodec"
      >
        Supprimer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["codec"],
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    deleteCodec() {
      this.$store.dispatch("deleteCodec", this.codec);
      this.closeDialog();
    }
  }
};
</script>

