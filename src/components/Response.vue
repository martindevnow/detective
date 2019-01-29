<template>
  <div class="response">
    <div class="subject">Asked {{ personById(question.personId) }} about {{ question.topic }}</div>
    {{ response }}

    <button @click="resume()">Continue</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as actionType from '../store/action-types';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'question',
      'response',
      'personById',
    ]),
  },
  methods: {
    resume() {
      this.$store.commit(actionType.RESUME)
    }
  }
}
</script>