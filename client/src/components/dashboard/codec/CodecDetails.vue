<template>
  <v-card>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        md6
        sm6
      >
        <v-list
          two-line
          subheader
        >
          <v-subheader>Infos du codec</v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Nom</v-list-tile-title>
              <v-list-tile-sub-title>{{ codec.name }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Type</v-list-tile-title>
              <v-list-tile-sub-title>{{ codec.type }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Adresse IP</v-list-tile-title>
              <v-list-tile-sub-title>{{ codec.ip }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Adresse MAC</v-list-tile-title>
              <v-list-tile-sub-title>{{ codec.mac }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Login</v-list-tile-title>
              <v-list-tile-sub-title>{{ codec.login}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Mot de passe</v-list-tile-title>
              <v-list-tile-sub-title>{{ codec.password}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Equipe</v-list-tile-title>
              <v-list-tile-sub-title>{{ codec.team}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Etage</v-list-tile-title>
              <v-list-tile-sub-title>{{ codec.floor}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex
        xs12
        sm5
        md5
        offset-md1
        offset-sm1
      >
        <v-list
          two-line
          subheader
        >
          <v-subheader>Cochez les applications souhaitées</v-subheader>
          <v-list-tile @click="updateCodec({id: codec._id, propName: 'peoplePresence', value: !codec.peoplePresence})">
            <v-list-tile-action>
              <v-checkbox
                v-model="codec.peoplePresence"
                @change="updateCodec({id: codec._id, propName: 'peoplePresence', value: !codec.peoplePresence})"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Cisco People Presence</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="updateCodec({id: codec._id, propName: 'feedbackMeeting', value: !codec.feedbackMeeting})">
            <v-list-tile-action>
              <v-checkbox
                v-model="codec.feedbackMeeting"
                @change="updateCodec({id: codec._id, propName: 'feedbackMeeting', value: !codec.feedbackMeeting})"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Feedback Meeting</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="updateCodec({id: codec._id, propName: 'bulkWallpaperPush', value: !codec.bulkWallpaperPush})">
            <v-list-tile-action>
              <v-checkbox
                v-model="codec.bulkWallpaperPush"
                @change="updateCodec({id: codec._id, propName: 'bulkWallpaperPush', value: !codec.bulkWallpaperPush})"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Bulk Wallpaper Push</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="updateCodec({id: codec._id, propName: 'alertBot', value: !codec.alertBot})">
            <v-list-tile-action>
              <v-checkbox
                v-model="codec.alertBot"
                @change="updateCodec({id: codec._id, propName: 'alertBot', value: !codec.alertBot})"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Alert Bot</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-alert
          :value="codec.error"
          type="error"
        >
          {{ codec.error }}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ["codec"],
  methods: {
    updateCodec(payload) {
      this.$store.dispatch("updateOneProp", payload);
    }
  }
};
</script>