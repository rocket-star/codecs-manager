<template>
  <v-toolbar app dark color="primary">
    <v-toolbar-title class="white--text align-center flex">
      <img src="../../assets/logo.png" class="header-logo"> {{ title }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <a class="d-flex link-menu" target="_blank" :href="getURL('15131')">
        <v-btn flat>People Presence</v-btn>
      </a>
      <a class="d-flex link-menu" target="_blank" :href="getURL('15140')">
        <v-btn flat>Feedback Meeting</v-btn>
      </a>
      <a class="d-flex link-menu" target="_blank" :href="getURL('15150')">
        <v-btn flat>Bulk Wallpaper Push</v-btn>
      </a>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      title: "Codecs Manager"
    };
  },
  methods: {
    getURL(port) {
      if (window.location.href.includes("websrv2")) {
        return "http://websrv2.ciscofrance.com:" + port;
      } else {
        return "http://websrv.ciscofrance.com:" + port;
      }
    }
  }
};
</script>

<style>
.header-title {
  margin-top: 2px;
}

.header-logo {
  width: 80px;
  height: auto;
  vertical-align: middle;
}

.link-menu {
  color: white;
  text-decoration: none;
}
</style>
