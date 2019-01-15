<template>
  <div v-if="scenario">
    
    <h2>{{ scenario.name }}</h2>
    <p>{{ scenario.introText }}</p>

    <button @click="begin()">Begin</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Survey from '../views/Survey.vue';

export default {
  components: {
    Survey,
  },
  data() {
    return {

    };
  },
   computed: {
    ...mapGetters([
      'scenario',
      'location',
    ]),
  },
  methods: {
    begin() {
      this.$router.push({name: 'location', params: { id: this.scenario.id, location: this.location.id }});
    }
  }
  
}
</script>