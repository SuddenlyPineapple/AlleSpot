<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span><span class="primary--text">Alle</span>Spot</span>
        <span class="font-weight-light"> - Intership Quest</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/SuddenlyPineapple" target="_blank">
        <span class="mr-2">GitHub</span>
      </v-btn>
    </v-toolbar>

    <v-container grid-list-md>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-container>
  
  </v-app>
</template>

<script lang="js">
import {Vue, Component, Prop} from 'vue-property-decorator';
import SpotifySearch from './components/SpotifySearch.vue';
import Welcome from './components/Welcome.vue';


export default Vue.extend({
  name: 'App',
});
</script>
