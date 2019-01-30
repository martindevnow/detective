<template>
  <div class="interaction">

    <div class="question" v-if="isQuestion(interaction)">
      <div class="subject">Asked {{ personById(question.personId).name }} about {{ getQuestionTopic(question.topic).name }}</div>
      <div class="description">"{{ question.answer }}"</div>
    </div>

    <div class="movement" v-if="isMovement(interaction)">
      <div class="subject">You walk into {{ location.name }}</div>
      <div class="description">{{ location.initDescription }}</div>
    </div>

    <div class="person" v-if="isPerson(interaction)">
      <div class="subject">Currently speaking to {{ person.name }}</div>
      <div class="description">"{{ person.getGreeting().body }}"</div>
    </div>

    <button @click="resume()">Continue</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as actionType from '../store/action-types';
import * as interactionType from '../models/interaction-types';
import * as utils from '../helpers/utils';
import * as qrType from '../models/qr-types';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'interaction',
      'location',
      'person',
      'personById',
      'question',
      'triggers',
      'personByCode'
    ]),
  },
  methods: {
    isQuestion(type) { return type === interactionType.QUESTION},
    isMovement(type) { return type === interactionType.MOVEMENT},
    isPerson(type) { return type === interactionType.PERSON},
    getQuestionTopic(code) {
      console.log('[getQuestionTopic]');
      console.log('[code]', code);
      console.log(`${utils.getQRType(code)}`)

      switch (utils.getQRType(code)) {
        case qrType.PERSON:
          console.log('fetching person from state with [personByCode] getter')
          return this.personByCode(code);
          break;
        case qrType.ITEM:
          return this.userItemByCode(code);
          break;
        default:
          return {};
      }

    },
    resume() {
      this.$store.commit(actionType.RESUME)
    },
  }
}
</script>

<style>
.person, .question, .movement {
  margin-top: 20px; 
  height: 250px; 
}
.subject {
  font-size: 26px;
}
</style>