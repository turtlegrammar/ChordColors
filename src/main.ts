import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify/lib";

import 'vuetify/dist/vuetify.min.css';

const vuetify = new Vuetify({});

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");