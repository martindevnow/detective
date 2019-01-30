<template>
  <div class="location">

    <location-status></location-status>

    <div class="location-body">
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

      <fake-scanner></fake-scanner>

      <location-actions></location-actions>
  
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FakeScanner from '../components/FakeScanner.vue';
import LocationActions from '../components/LocationActions.vue';
import LocationStatus from '../components/LocationStatus.vue';
import * as actionType from '../store/action-types';

export default {
  components: {
    FakeScanner,
    LocationStatus,
    LocationActions,
  },
  data() {
    return {
      qrActive: false,
      questioningText: '',
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
      this.qrActive = true;
    },
    onTouchEnd(e) {
      this.qrActive = false;
    },
    onDecodeQR(txt) {
      if (!this.qrActive) {
        return;
      }
      this.$store.dispatch(actionType.SCAN_QR, txt);
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
button {
  padding: 15px;
  background-color: gray;
  color: darkslategrey;
}
</style>