import Vue from 'vue';
import Hammer from 'hammerjs';

Vue.directive("press", {
  bind: function(el, binding) {
    if (typeof binding.value === "function") {
      const mc = new Hammer(el);
      // mc.get("press");
      mc.on("press", binding.value);
    }
  }
});

Vue.directive("pressup", {
  bind: function(el, binding) {
    if (typeof binding.value === "function") {
      const mc = new Hammer(el);
      // mc.get("pressup");
      mc.on("pressup", binding.value);
    }
  }
});