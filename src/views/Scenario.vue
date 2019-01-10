<template>
  <div v-if="scenario">
    <h2>{{ scenario.name }}</h2>
    <p>{{ scenario.introText }}</p>
    <qrcode-stream @decode="onDecode"></qrcode-stream>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
   computed: {
    ...mapGetters([
      'scenario',
    ]),
  },
  methods: {
    onDecode(txt) {
      alert(txt);
    }
  }
}
</script>