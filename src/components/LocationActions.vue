<template>
  <div class="actions-available">
      <button v-if="userIsIdle && canSearchCurrentLocation" @click="searchForClues()">Search for Clues</button>
      <button v-if="userIsQuestioning" @click="resume()">Say Goodbye</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ActionType from '../store/action-type';

export default {

  data() {
    return {};
  }, 
  computed: {
    ...mapGetters([
      'status',
      'userIsIdle',
      'userIsQuestioning',
      'canSearchCurrentLocation',
    ]),
  },
  methods: {
    resume() {
      this.$store.dispatch(ActionType.RESUME);
    },
    searchForClues() {
      this.$store.dispatch(ActionType.SEARCH_FOR_CLUES);
    }
  }
}
</script>

<style>
</style>