<template>
  <div class="actions-available">
      <button v-if="userIsIdle && canSearchCurrentLocation" @click="searchForClues()">Search for Clues</button>
      <button v-if="userIsQuestioning" @click="resume()">Say Goodbye</button>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {

  data() {
    return {};
  }, 
  computed: {
    ...mapGetters([
      'status',
      'userIsIdle',
      'userIsQuestioning',
    ]),
  },
  methods: {
    resume() {
      this.$store.dispatch(actionType.RESUME);
    },
    searchForClues() {
      this.$store.dispatch(actionType.SEARCH_FOR_CLUES);
    }
  }
}
</script>

<style>
</style>