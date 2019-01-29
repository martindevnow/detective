<template>
  <div class="location">

    <h2>{{ location.name }}</h2>
    <p>{{ location.initialDescription }}</p>
    <div class="center-screen" v-if="!response">
      <div class="qr-window" :class="{active: qrActive}">
        <div class="qr-activator"
          @mousedown="onTouch" 
          @mouseup="onTouchEnd" 
          @mouseleave="onTouchEnd"
          v-touch="onTouch"
          v-touchend="onTouchEnd"
          ></div>
        <qrcode-stream 
          :track="qrActive"
          @decode="onDecodeQR"></qrcode-stream>
      </div>
    </div>
    <fake-scanner></fake-scanner>


    <div class="response" v-if="response">
      <p>{{ response }}</p>
      <button @click="resume">Continue</button>
    </div>

    <button v-if="isIdle && canSearchCurrentLocation" @click="searchForClues()">Search for Clues</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FakeScanner from '../components/FakeScanner.vue';
import * as actionType from '../store/action-types';

export default {
  components: {
    FakeScanner,
  },
  data() {
    return {
      qrActive: false,
      questioningText: '',
      response: '',
    };
  },
  computed: {
    ...mapGetters([
      'scenario',
      'location',
      'status',
      'canSearchCurrentLocation'
    ]),
  },
  methods: {
    resume() {
      this.$store.dispatch(actionType.RESUME);
    },
    onTouch(e) {
      console.log('onTouch', e)
      this.qrActive = true;
    },
    onTouchEnd(e) {
      console.log('onTouchEnd', e)
      this.qrActive = false;
    },
    onDecodeQR(txt) {
      if (!this.qrActive) {
        return;
      }
      this.$store.dispatch(actionType.SCAN_QR, txt);
      console.log(`QR Code Scanned: ${txt}`);
      this.qrActive = false;
    },
    searchForClues() {
      this.$store.dispatch(actionType.SEARCH_FOR_CLUES);

    }
  }
}
</script>

<style>

.center-screen {
  display: flex;
  align-items: center;
  justify-content: center;
}
.qr-window {
  position: relative;
  display: flex;
  margin: 50px 50px;
  width: 250px;
  height: 250px;
  border: 6px solid #888888;
  background-color: black;
  overflow: hidden;
}
.qr-activator {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  overflow: hidden;
}
qrcode-stream {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.active {
  border-color: lightseagreen;
}
button {
  padding: 15px;
  background-color: gray;
  color: darkslategrey;
}
</style>