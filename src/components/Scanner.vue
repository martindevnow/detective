<template>
  <div class="center-screen">
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
</template>

<script>
import ActionType from '../store/action-type';

export default {
  data() {
    return {
      qrActive: false,
    };
  },
  computed: {},
  methods: {
    onTouch() {
      this.qrActive = true;
    },
    onTouchEnd() {
      this.qrActive = false;
    },
    onDecodeQR(txt) {
      if (!this.qrActive) {
        return;
      }
      this.$store.dispatch(ActionType.SCAN_QR, txt);
      this.qrActive = false;
    },
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
</style>