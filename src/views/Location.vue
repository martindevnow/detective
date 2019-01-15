<template>
  <div class="location">

    <h2>{{ location.name }}</h2>
    <p>{{ location.initialDescription }}</p>

    <div class="center-screen">
      <div class="qr-window" :class="{active: qrActive}">
        <div class="qr-activator"
          @mousedown="activateQR()" 
          @mouseup="deactivateQR()" 
          @mouseleave="deactivateQR()"></div>
        <qrcode-stream 
          :paused="!qrActive"
          @decode="onDecodeQR" 
          @mousedown="activateQR()" 
          @mouseup="deactivateQR()" 
          @mouseleave="deactivateQR()"></qrcode-stream>
      </div>
    </div>

    <div class="response" v-if="response">
      <p>{{ response }}</p>
      <button @click="askQuestion = true">Ask a follow up question...</button>
    </div>

    <button v-if="isIdle" @click="searchForClues()">Search for Clues</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isIdle: true,
      talkToPerson: false,
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
    ]),
  },
  methods: {
    cancel() {
      this.isIdle = true;
      this.talkToPerson = false;
      this.isQuestioning = false;
    },
    onQuestionIndividual(txt) {
      this.questioningText = `You are now questioning: ${txt}`;
      this.isQuestioning = true;
      this.isIdle = false;
    },
    onAskQuestion(txt) {
      this.askQuestion = false;
      this.response = `This is a hard coded response.. sorry, no info here. You asked about ${txt}`;
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
</style>