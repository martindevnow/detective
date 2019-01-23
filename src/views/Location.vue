<template>
  <div class="location">

    <h2>{{ location.name }}</h2>
    <p>{{ location.initialDescription }}</p>
    <div class="center-screen" v-if="true">
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
      <button @click="askQuestion = true">Ask a follow up question...</button>
    </div>

    <button v-if="isIdle && canSearchCurrentLocation" @click="searchForClues()">Search for Clues</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FakeScanner from '../components/FakeScanner.vue';

export default {
  components: {
    FakeScanner,
  },
  data() {
    return {
      qrActive: false,
      isIdle: true,
      askQuestion: false,
      isQuestioning: false,
      isSurveying: false,
      questioningText: '',
      response: '',
    };
  },
  computed: {
    ...mapGetters([
      'scenario',
      'location',
      'canSearchCurrentLocation'
    ]),
  },
  methods: {
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
      this.response = `QR Code Scanned: ${txt}`;
      this.qrActive = false;
    },
    searchForClues() {
      this.isSurveying = true;
      const navTo = {name: 'survey', params: { id: this.scenario.id, location: this.location.id }};
      console.log(navTo)
      this.$router.push(navTo);
      setTimeout(() => { 
        this.isSurveying = false;
        this.$router.back();
      }, 15000);
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