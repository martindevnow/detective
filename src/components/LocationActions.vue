<template>
  <div class="actions-available">
      <button v-if="userIsIdle && canSearchCurrentLocation" @click="searchForClues()">Search for Clues</button>
      <button v-if="userIsQuestioning" @click="goodbye()">Say Goodbye</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as ActionType from '../store/action-type';

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
    goodbye() {
      this.$store.dispatch(ActionType.SAY_GOODBYE);
    },
    searchForClues() {
      this.$store.dispatch(ActionType.SEARCH_FOR_CLUES);
    }
  }
}
</script>

<style>
</style>