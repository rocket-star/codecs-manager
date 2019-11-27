<template>
  <v-card>
    <v-card-title class="headline">Ajouter un codec</v-card-title>
    <v-card-text class="pl-5 pr-5">
      <form>
        <v-text-field
          label="Nom"
          :error="$v.name.$error"
          v-model="name"
          @blur="$v.name.$touch()"
          outlined
        ></v-text-field>

        <v-text-field
          label="Type"
          :error="$v.type.$error"
          v-model="type"
          @blur="$v.type.$touch()"
          outlined
        ></v-text-field>

        <v-text-field
          label="Adresse IP"
          :error="$v.ip.$error"
          v-model="ip"
          @blur="$v.ip.$touch()"
          outlined
        ></v-text-field>

        <v-text-field
          label="Adresse MAC"
          :error="$v.mac.$error"
          v-model="mac"
          @blur="$v.mac.$touch()"
          outlined
        ></v-text-field>

        <v-text-field
          label="Login"
          :error="$v.login.$error"
          v-model="login"
          @blur="$v.login.$touch()"
          outlined
        ></v-text-field>

        <v-text-field
          label="Mot de passe"
          :error="$v.password.$error"
          v-model="password"
          @blur="$v.password.$touch()"
          outlined
        ></v-text-field>

        <v-select
          v-model="team"
          :items="teams"
          item-text="name"
          item-value="id"
          label="Equipe"
          outlined
        ></v-select>

        <v-select
          v-model="floor"
          :items="floors"
          item-text="name"
          item-value="id"
          label="Etage"
          outlined
        ></v-select>

        <v-radio-group
          v-model="cloud"
          row
        >
          <v-radio
            label="Webex device"
            :value="true"
          ></v-radio>
          <v-radio
            label="On-Premise device"
            :value="false"
          ></v-radio>
        </v-radio-group>
      </form>
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
        @click="submit"
        :disabled="$v.$invalid"
      >
        Ajouter
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "",
      type: "",
      ip: "",
      mac: "",
      login: "",
      password: "",
      cloud: false,
      team: "",
      floor: "",
      teams: [
        { name: "Collaboration", id: "collab" },
        { name: "Commercial", id: "sale" },
        { name: "Data Center", id: "dc" }
      ],
      floors: [
        { name: "1er étage", id: "1" },
        { name: "2ème étage", id: "2" },
        { name: "3ème étage", id: "3" }
      ]
    };
  },
  methods: {
    closeDialog() {
      this.clearForm();
      this.$emit("closeDialog");
    },
    clearForm() {
      this.name = "";
      this.type = "";
      this.ip = "";
      this.mac = "";
      this.login = "";
      this.password = "";
      this.cloud = false;
      this.team = "";
      this.floor = "";
      this.$v.$reset();
    },
    submit() {
      if (!this.$v.$invalid) {
        var formData = {
          name: this.name,
          type: this.type,
          ip: this.ip,
          mac: this.mac,
          login: this.login,
          password: this.password,
          cloud: this.cloud,
          team: this.team,
          floor: this.floor,
          proximity: 0
        };

        this.$store.dispatch("addCodec", formData);
        this.closeDialog();
      }
    }
  },
  validations: {
    name: {
      required
    },
    type: {
      required
    },
    ip: {
      required
    },
    mac: {
      required
    },
    login: {
      required
    },
    password: {
      required
    },
    team: {
      required
    },
    floor: {
      required
    }
  }
};
</script>
