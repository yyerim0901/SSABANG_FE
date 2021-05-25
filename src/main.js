import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";
import VuetifyDialog from 'vuetify-dialog';

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.$cookies.config("7d");
Vue.use(VuetifyDialog)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
