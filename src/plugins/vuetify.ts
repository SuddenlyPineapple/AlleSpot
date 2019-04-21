import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';


Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#00C853',
    secondary: '#56595b',
    accent: '#FFCC80',
    error: '#b71c1c',
  },
});
