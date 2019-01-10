<template>
  <div class="scenario-select">
    <h1>Select a Scenario</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/scenarios">Scenarios</router-link>
    </div>
    <div id="scenario-list">
      <ul>
        <li v-for="scenario in scenarios" :key="scenario.id" 
            @click="select(scenario.id)">{{scenario.name}}</li>
      </ul>
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