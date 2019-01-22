<template>
  <div class="scenario-select">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/scenarios">Scenarios</router-link>
    </div>

    <h1>Select a Scenario</h1>
    <div id="scenario-list">
        <button v-for="scenario in scenarios" :key="scenario.id" 
            @click="select(scenario.id)">{{scenario.name}}</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as actionType from '../action-types';

export default {
  computed: {
    ...mapGetters([
      'scenarios',
    ]),
  },
  methods: {
    select (id) {
      this.$store.dispatch(actionType.SELECT_SCENARIO, id);
      this.$router.push({name: 'scenario', params: { id }});
    },
  }
}
</script>