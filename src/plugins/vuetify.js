import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(Vuetify);
Vue.use(VuetifyDialog, {
    context: {
      Vuetify
    }
  })

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    }
});
