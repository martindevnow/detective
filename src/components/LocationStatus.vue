<template>
  <div class="header">
    <h1 v-if="isIdle(status)">At {{ location.name }}</h1>
    <h1 v-if="isQuestioning(status)">Talking to {{ person.name }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as PlayerStatus from '../enums/player-status';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'status',
      'location',
      'person',
    ]),
  },
  methods: {
    isIdle: (status) => status === PlayerStatus.IDLE, 
    isQuestioning: (status) => { return status === PlayerStatus.QUESTIONING },
  }
}
</script>

<style>
.header h1 {
  color: white;
}
</style>