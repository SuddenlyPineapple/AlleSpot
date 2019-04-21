<template>
  <div id="welcome" class="text-xs-center">
      <h3>Zaloguj się do Spotify, by móc przeszukiwać baze albumów!</h3>
      <v-btn color="success" @click="handleAuth">ZALOGUJ SIĘ</v-btn>
  </div>
</template>

<script lang="js">
import {Vue, Component, Prop} from 'vue-property-decorator';

export default Vue.extend({
  name: 'Welcome',
  props: ['handleAuth'],
});

</script>