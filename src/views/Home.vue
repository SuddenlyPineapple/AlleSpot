<template>
  <div id="home">
    <welcome v-if="!token" :handleAuth="authIn"/>
    <spotify-search v-if="token" :data="data"/>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="js">
import {Vue, Component, Prop} from 'vue-property-decorator';
import SpotifySearch from '../components/SpotifySearch.vue';
import Welcome from '../components/Welcome.vue';
import URL from '../config/auth.js';

export default Vue.extend({
  name: 'Home',
  components: {
    SpotifySearch,
    Welcome,
  },
  data() {
    return {
      token: null,
      error: null,
      data: null,
    };
  },
  created() { // TODO: TokenRefreshing
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      this.token = token;
      // this.getInfo({ // TODO: Replace getInfo
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      return;
    }
    const error = /[#&]error=/.exec(window.location.hash);
    if (error) {
      this.error = 'Error signing in. Please try again later.';
    }
    const match = /[#&]access_token=([^&]*)/.exec(window.location.hash);
    if (match) {
      const accessToken = decodeURIComponent(match[1].replace(/\+g/, ' '));
      this.token = accessToken;
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      // this.getInfo(options); // TODO: Replace getInfo
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      window.location.hash = '';
    }
  },
  methods: {
    authIn() {
      window.location = URL;
    },
  },
});
</script>
