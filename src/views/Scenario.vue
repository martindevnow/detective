<template>
  <div v-if="scenario">
    
    <h2>{{ scenario.name }}</h2>
    <p>{{ scenario.introText }}</p>

    <div class="startQuestioning" v-if="!isQuestioning">
      <button @click="talkToPerson = true">Talk to Someone</button>
      <qrcode-stream v-if="talkToPerson" @decode="onQuestionIndividual"></qrcode-stream>
    </div>

    <div class="isQuestioning" v-if="isQuestioning">
      <p>{{ this.questioningText }}</p>
      <button @click="askQuestion = true" v-if="!response">Ask About...</button>
      <qrcode-stream v-if="askQuestion" @decode="onAskQuestion"></qrcode-stream>
    </div>

    <div class="response" v-if="response">
      <p>{{ response }}</p>
      <button @click="askQuestion = true">Ask a follow up question...</button>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      talkToPerson: false,
      askQuestion: false,
      isQuestioning: false,
      questioningText: '',
      response: '',
    };
  },
   computed: {
    ...mapGetters([
      'scenario',
    ]),
  },
  methods: {
    onQuestionIndividual(txt) {
      this.questioningText = `You are now questioning: ${txt}`;
      this.isQuestioning = true;
    },
    onAskQuestion(txt) {
      this.askQuestion = false;
      this.response = `This is a hard coded response.. sorry, no info here. You asked about ${txt}`;
    }
  }
}
</script>