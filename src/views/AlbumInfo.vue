<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap v-if="albumInfo != null">

      <v-btn color="primary" dark fab class="hidden-sm-and-down top-button" fixed large mr-4 :to="'/'"> <!-- absolute right bottom -->
        <v-icon dark>fas fa-angle-double-left</v-icon>
      </v-btn>
      <v-btn color="primary" dark fab class="hidden-md-and-up" fixed left bottom large mr-4 :to="'/'">
        <v-icon dark>fas fa-angle-double-left</v-icon>
      </v-btn>
      
      <v-flex d-flex xs12 md6>
        <v-card dark class="text-xs-center">
          <v-card-text>
            <span v-if="albumInfo.images.length > 2"><img :src="albumInfo.images[1].url"></span>
            <span v-else><img src="../assets/default-album-artwork.png"/></span>
          </v-card-text>
        </v-card>
      </v-flex>
      
      <v-flex d-flex xs12 sm12 md6>
        <v-card dark>
          <v-card-title class="title">
            <h2 class="mb-3 mt-3 full-width">{{ albumInfo.name }}</h2>
            <h3 class="title"> 
              <span v-for="(artist, index) in albumInfo.artists" :key="artist.id" :index="index">{{ artist.name }}<span v-if="albumInfo.artists.length-1 != index">,</span> </span>
            </h3>
          </v-card-title>
            <v-card-text>
              <p class="mb-1">Data wydania: {{ albumInfo.release_date }}</p>
              <p>Liczba utworów: {{ albumInfo.total_tracks }}</p>
            </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12>
         <v-data-table dark :headers="tracksHeaders" :items="albumInfo.tracks.items" class="elevation-1" :disable-initial-sort="true" :rows-per-page-items="[10, 25, { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1}]">
            <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ convertMillisToMinsSecs(props.item.duration_ms) }}</td>
            </template>
        </v-data-table>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script lang="js">
import {Vue, Component, Prop} from 'vue-property-decorator';

export default Vue.extend({
  props: ['id'],
  data: () => {
    return {
      token: '',
      albumInfo: null,
      tracksHeaders: [
        { text: 'Utwór', align: 'left', sortable: true, value: 'name' },
        { text: 'Czas', align: 'right', sortable: true, value: 'duration_ms' },
      ],
    };
  },
  created() {
    this.token = localStorage.getItem('ACCESS_TOKEN');
  },
  methods: {
    getAlbumInfo(accessToken) {
        // Request Settings
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://api.spotify.com/v1/albums/' + encodeURI(this.id),
            method: 'GET',
            headers: {
                Authorization:
                'Bearer ' + this.token,
            },
        };

        if (this.query !== '') {
            axios(settings).then((response) => {
                this.albumInfo = response.data;
            })
            .catch((error) => {
                localStorage.setItem('ACCESS_TOKEN', '');
                window.location = '/';
            });
        }
    },
    convertMillisToMinsSecs(millis) {
      const mins = Math.floor(millis / 60000);
      const secs = ((millis % 60000) / 1000).toFixed(0);
      const duration = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      return duration;
    },
  },
  mounted() {
    this.getAlbumInfo();
  },
});
</script>

<style lang="scss" scoped>
  .top-button {
    margin-left: -20px;
    margin-top: -20px;
  }
  .full-width {
    width: 100%;
  }
</style>
