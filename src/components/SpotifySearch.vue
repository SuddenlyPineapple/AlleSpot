<template>
    <div id="searchComponent">
        <v-text-field label="Szukaj albumu..." solo @keyup="searchAlbums" v-model="query"> {{ query }}</v-text-field>
        <v-data-table v-if="query" :headers="headers" :items="albums.items" class="elevation-1" :disable-initial-sort="true" :rows-per-page-items="[5, 10, 25, { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1}]">
            <template v-slot:items="props">
                <td v-if="props.item.images.length == 3"><img :src="props.item.images[2].url"></td>
                <td v-else><img src="../assets/default-album-artwork.png" height="64" width="64"/></td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.artists[0].name }}</td>
                <td>{{ props.item.total_tracks }}</td>
                <td>{{ props.item.release_date }}</td>
                <td class="text-xs-center"><v-btn fab small outline color="success" :to="'/album/'+props.item.id"><v-icon dark>fas fa-angle-double-right</v-icon></v-btn></td>
            </template>
        </v-data-table>
        <div v-else>
            <v-card-title class="pt-0 less-margin-top">
                <img src="../assets/arrow-flat-2.png" class="arrow-position">
                <h1 class="title">Poszukaj albumu!</h1>
            </v-card-title>
        </div>
    </div>
</template>

<script lang="js">
import {Vue, Component, Prop} from 'vue-property-decorator';
import axios from 'axios';
import * as oauth from 'axios-oauth-client';
import * as axiosOAuth from 'axios-oauth-client';
export default Vue.extend({
  data: () => {
      return {
          query: '',
          headers: [
              { text: 'Okładka', align: 'left', sortable: false, value: 'url' },
              { text: 'Album', align: 'left', sortable: true, value: 'name' },
              { text: 'Wykonawca', align: 'left', sortable: true, value: 'artists[0].name' },
              { text: 'Utwory', align: 'left', sortable: true, value: 'total_tracks' },
              { text: 'Data Wydania', align: 'left', sortable: true, value: 'release_date' },
              { text: 'Więcej...', align: 'left', sortable: false, value: 'Szczegóły' },
          ],
          albums: {},
          token: '',
          display: false,
      };
  },
  methods: {
    searchAlbums(accessToken) {
        localStorage.setItem('query', this.query);
        // Request Settings
        const settings = {
            async: true,
            crossDomain: true,
            url: 'https://api.spotify.com/v1/search?q=' + encodeURI(this.query) + '&type=album&limit=50',
            method: 'GET',
            headers: {
                Authorization:
                'Bearer ' + this.token,
            },
        };

        if (this.query !== '') {
            axios(settings).then((response) => {
                this.albums = response.data.albums;
            })
            .catch((error) => {
                localStorage.setItem('ACCESS_TOKEN', '');
                window.location = '/';
            });
        }
    },
  },
  mounted() {
      const query = localStorage.getItem('query');
      if (query) {
          this.query = query;
      }

      this.token = localStorage.getItem('ACCESS_TOKEN');
      this.searchAlbums();
  },
});
</script>

<style scope lang="scss">
    img {
        margin-top: 5px;
    }
    .arrow-position {
        max-height: 64px;
        margin-right: 10px;
    }
    .less-margin-top {
        margin-top: -15px;
    }
</style>

