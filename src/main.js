import Vue from 'vue'
import VueQrcodeReader from 'vue-qrcode-reader';
import App from './App.vue'
import router from './router'
import store from './store'

import Hammer from 'hammerjs';

Vue.directive("touch", {
  bind: function(el, binding) {
    if (typeof binding.value === "function") {
      const mc = new Hammer(el);
      mc.on("press", binding.value);
    }
  }
});

Vue.directive("touchend", {
  bind: function(el, binding) {
    if (typeof binding.value === "function") {
      const mc = new Hammer(el);
      mc.on("pressup", binding.value);
      mc.on("panend", binding.value);
      mc.on("pancancel", binding.value);
    }
  }
});

Vue.config.productionTip = false
Vue.use(VueQrcodeReader);

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (window.Cypress) {
  window.app = app;
}