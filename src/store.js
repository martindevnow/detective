import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: {
      scenario: {},
    },
    scenarios: [
      { id: 1, name: 'Fear the Living', introText: 'You walk into the lorem ipsum dolor sit amet' },
    ]
  },
  getters: {
    scenarios: (state) => state.scenarios,
    scenario: (state) => state.current.scenario,
  },
  mutations: {
    selectScenario: (state, id) => state.current = { ...state.current, scenario: state.scenarios.find(scenario => id === scenario.id) },
  },
  actions: {
    selectScenario: ({ commit }, id) => {
      commit('selectScenario', id);
    }
  }
})
