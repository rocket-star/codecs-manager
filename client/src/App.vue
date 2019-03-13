<template>
  <v-app>
    <app-header></app-header>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";

export default {
  data() {
    return {
      title: "Codecs Manager"
    };
  },
  components: {
    appHeader: Header,
    appFooter: Footer
  }
};
</script>
