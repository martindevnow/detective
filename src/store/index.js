import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'
import initState from './state';
import actions from './actions';
import mutations from './mutations';
import * as getters from './getters';
import { Scenario } from '../models/scenario';
import VuexActionLogger from './logger';

// const vuexPersist = new VuexPersist({
//   key: 'my-app',
//   storage: localStorage
// })

Vue.use(Vuex);
Vue.use(VuexActionLogger(Vuex));

const state = {
  current: initState.current,
  scenarios: initState.scenarios.map(s => new Scenario(s)),
};

export default new Vuex.Store({
  // plugins: [vuexPersist.plugin],
  state,
  actions,
  mutations,
  getters,
});
