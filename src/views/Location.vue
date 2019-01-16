<template>
  <div class="location">

    <h2>{{ location.name }}</h2>
    <p>{{ location.initialDescription }}</p>
    <p v-if="qrActive"><strong>Tracking ACTIVE</strong></p>
    <p v-if="!qrActive"><strong>Tracking off</strong></p>
    <div class="center-screen">
      <div class="qr-window" :class="{active: qrActive, 'is-pressed': isPressed}">
        <div class="qr-activator"
          @mousedown="activateQR()" 
          @mouseup="deactivateQR()" 
          @mouseleave="deactivateQR()"
          v-bind:press="onPress"
          v-bind:pressup="onPressUp"
          ></div>
        <qrcode-stream 
          :track="qrActive"
          @decode="onDecodeQR"></qrcode-stream>
      </div>
    </div>

    <div class="response" v-if="response">
      <p>{{ response }}</p>
      <button @click="askQuestion = true">Ask a follow up question...</button>
    </div>

    <button v-if="isIdle && canSearchCurrentLocation" @click="searchForClues()">Search for Clues</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import QrcodeStream from '../components/QrcodeStream.vue';

export default {
  // components: {
  //   'qrcode-stream': QrcodeStream,
  // },
  data() {
    return {
      qrActive: false,
      isPressed: false,
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
    onPress(e) {
      console.log('onPress', e)
      this.isPressed = true;
    },
    onPressUp(e) {
      console.log('onPressUp', e)
      this.isPressed = false;
    },
    activateQR() {
      console.log('activating');
      this.qrActive = true;
    },
    deactivateQR() {
      this.qrActive = false;
    },
    cancel() {
      this.isIdle = true;
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
  width: 50vh;
  height: 50vh;
  border: 3px solid black;
  background-color: black;
}
.qr-activator {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
}
qrcode-stream {
  position: absolute;
  top: 0;
  left: 0;
}
.active {
  border-color: lightseagreen;
}
.is-pressed {
  background-color: lightgreen;
}
</style>