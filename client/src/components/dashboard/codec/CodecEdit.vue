<template>
  <v-card>
    <v-card-title class="headline">Mettre à jour les infos du codec</v-card-title>
    <v-card-text class="pl-5 pr-5">
      <form v-if="codecCopy">
        <v-text-field
          label="Nom"
          :error="$v.codecCopy.name.$invalid"
          v-model="codecCopy.name"
          @blur="$v.codecCopy.name.$touch()"
        ></v-text-field>

        <v-text-field
          label="Type"
          :error="$v.codecCopy.type.$invalid"
          v-model="codecCopy.type"
          @blur="$v.codecCopy.type.$touch()"
        ></v-text-field>

        <v-text-field
          label="Adresse IP"
          :error="$v.codecCopy.ip.$invalid"
          v-model="codecCopy.ip"
          @blur="$v.codecCopy.ip.$touch()"
        ></v-text-field>

        <v-text-field
          label="Adresse MAC"
          :error="$v.codecCopy.mac.$invalid"
          v-model="codecCopy.mac"
          @blur="$v.codecCopy.mac.$touch()"
        ></v-text-field>

        <v-text-field
          label="Login"
          :error="$v.codecCopy.login.$invalid"
          v-model="codecCopy.login"
          @blur="$v.codecCopy.login.$touch()"
        ></v-text-field>

        <v-text-field
          label="Mot de passe"
          :error="$v.codecCopy.password.$invalid"
          v-model="codecCopy.password"
          @blur="$v.codecCopy.password.$touch()"
        ></v-text-field>

        <v-select
          v-model="codecCopy.team"
          :items="teams"
          item-text="name"
          item-value="id"
          label="Equipe"
          outlined
        ></v-select>

        <v-select
          v-model="codecCopy.floor"
          :items="floors"
          item-text="name"
          item-value="id"
          label="Etage"
          outlined
        ></v-select>

        <v-slider
          label="Proximity Volume"
          v-model="codecCopy.proximity"
          :max="max"
          :min="min"
          thumb-label
        ></v-slider>

        <v-radio-group
          v-model="codecCopy.cloud"
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
        Modifier
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      codecCopy: null,
      codecId: null,
      min: 0,
      max: 70,
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
  props: ["codec"],
  watch: {
    codec(val) {
      this.codecCopy = {
        name: this.codec.name,
        type: this.codec.type,
        ip: this.codec.ip,
        mac: this.codec.mac,
        login: this.codec.login,
        password: this.codec.password,
        cloud: this.codec.cloud,
        team: this.codec.team,
        floor: this.codec.floor,
        proximity: this.codec.proximity
      };
      this.codecId = this.codec._id;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    submit() {
      if (!this.$v.$invalid) {
        var props = [];

        for (var prop in this.codecCopy) {
          props.push({
            propName: prop,
            value: this.codecCopy[prop]
          });
        }

        this.$store.dispatch("updateProps", {
          id: this.codecId,
          props: props
        });

        this.closeDialog();
      }
    }
  },
  validations: {
    codecCopy: {
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
      },
      proximity: {
        required
      }
    }
  }
};
</script>

