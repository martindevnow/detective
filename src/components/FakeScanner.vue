<template>
  <div class="fake-scanner">
    <input type="text" v-model="code" />
    <button @click="scan">Scan</button>
  </div>
</template>

<script>
import * as actionType from '../store/action-types';

export default {
  data() {
    return {
      code: 'lnd1_',
    }
  },
  methods: {
    scan() {
      this.$store.dispatch(actionType.SCAN_QR, this.code);
      this.code = 'lnd1_';
    },
  }
}
</script>