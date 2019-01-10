import Vue from 'vue'
import VueQrcodeReader from 'vue-qrcode-reader'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueQrcodeReader)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
