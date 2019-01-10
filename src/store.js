import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: {
      scenarioId: 0,
    },
    scenarios: [
      { id: 1, name: 'Fear the Living', introText: 'You walk into the lorem ipsum dolor sit amet' },
    ]
  },
  getters: {
    scenarios: (state) => state.scenarios,
    scenarioById: (state, id) => state.scenarios.find(scenario => scenario.id === id),
  },
  mutations: {
    selectScenario: (state, id) => state.current = { ...state.current, id: id },
  },
  actions: {
    selectScenario: ({ commit }, id) => {
      commit('selectScenario', id);
    }
  }
})
