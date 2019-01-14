import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: {
      scenario: {},
      triggers: [],
      location: {},
      person: {},
    },
    scenarios: [
      { 
        id: 1, 
        name: 'Fear the Living', 
        introText: 'You walk into the lorem ipsum dolor sit amet', 
        locations: [
          { id: 'lnd1_l0', name: 'Scotland Yard' },
          { id: 'lnd1_1E', name: `Victim's House` },
          { id: 'lnd1_1G', name: 'Modeling Agency' },
        ],
        people: [
          { id: 'lnd1_c01', name: 'Captain Murphy', fallback: `I can't be doing your job for you. Get out in the field and find out!` },
          { id: 'lnd1_c02', name: 'Miss Veeveeon', fallback: `Honestly, stupid questions don't deserve a response..` },
          { id: 'lnd1_c03', name: 'Mr Martin', fallback: `I see too many faces on a daily basis to remember everyone I encounter.` },
          { id: 'lnd1_lab', name: 'Lab Tech', fallback: `I wasn't able to find anything of any significance to the case.` }
        ],
        evidence: [
          { id: 'lnd1_e01', name: 'Chef Knife', info: `You found a chefs knife next to the body. Maybe they can tell you more about it at the lab.` },
        ],
        questions: [
          { suspect: 'lnd1_c01', topic: 'lnd1_c02', pretriggers: [], triggers: null,     response: `She's quite the looker. A woman that beautiful not tied down yet, something must be up.` },
          { suspect: 'lnd1_c02', topic: 'lnd1_e01', pretriggers: [], triggers: null,     response: `I like to cook.` },
          { suspect: 'lnd1_lab', topic: 'lnd1_e01', pretriggers: [], triggers: 1,        response: `Wow, looks like this could do some damage. It'll take some time to analyze. Call back in an hour.` },
          { suspect: 'lnd1_lab', topic: 'lnd1_e01', pretriggers: [1, 2], triggers: null, response: `The results of the analysis are in. It seems there are 2 sets of fingerprints. One set belogs to the victim, and the other set is not in our database. The blood belogs to our victim. Hope this was informative!` },
        ],
        events: [
          { id: 1, name: 'Knife Analysis Completed', triggers: 2 },
        ],
        triggers: [
          { id: 1, label: 'Knife Submitted for Analysis', causeEvent: 1,    delay: 60 },
          { id: 2, label: 'Knife Analysis Complete',      causeEvent: null, delay: 0 }
        ]
      },
    ],
  },
  getters: {
    scenarios: (state) => state.scenarios,
    scenario: (state) => state.current.scenario,
    location: (state) => state.current.location,
  },
  mutations: {
    selectScenario: (state, id) => { 
      const scenario = state.scenarios.find(s => id === s.id);
      state.current = { ...state.current, scenario, location: scenario.locations.find(l => l.id === 'lnd1_l0') };
    }
  },
  actions: {
    selectScenario: ({ commit }, id) => {
      commit('selectScenario', id);
    }
  }
})
