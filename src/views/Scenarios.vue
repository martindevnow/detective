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
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'scenarios',
    ]),
  },
  methods: {
    ...mapActions([
      'selectScenario',
    ]),
    select (id) {
      this.$store.dispatch('selectScenario', id);
      this.$router.push({name: 'scenario', params: { id }});
    },
  }
}
</script>