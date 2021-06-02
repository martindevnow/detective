<template>
  <div class="interaction">

    <div class="question" v-if="isQuestion(interaction)">
      <div class="subject">Asked {{ personById(question.personId).name }} about {{ getQuestionTopic(question.topic).name }}</div>
      <div class="description">"{{ interactionContentPage }}"</div>
    </div>

    <div class="movement" v-if="isMovement(interaction)">
      <div class="subject">You walk into {{ location.name }}</div>
      <div class="description">{{ interactionContentPage }}</div>
    </div>

    <div class="person" v-if="isPerson(interaction)">
      <div class="subject">Currently speaking to {{ person.name }}</div>
      <div class="description">"{{ interactionContentPage }}"</div>
    </div>

    <button @click="resume()">Continue ({{ interactionContentIndex + 1}} / {{ interactionContent && interactionContent.length }})</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as ActionType from '../store/action-type';
import * as InteractionType from '../enums/interaction-types';
import * as utils from '../helpers/utils';
import * as QRType from '../enums/qr-types';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'interaction',
      'interactionContent',
      'interactionContentIndex',
      'interactionContentPage',
      'location',
      'person',
      'personById',
      'question',
      'triggers',
      'personByCode',
    ]),
  },
  methods: {
    isQuestion(type) { return type === InteractionType.QUESTION},
    isMovement(type) { return type === InteractionType.MOVEMENT},
    isPerson(type) { return type === InteractionType.PERSON},
    getQuestionTopic(code) {
      console.log('[getQuestionTopic]');
      console.log('[code]', code);
      console.log(`${utils.getQRType(code)}`)

      switch (utils.getQRType(code)) {
        case QRType.PERSON:
          console.log('fetching person from state with [personByCode] getter')
          return this.personByCode(code);
        case QRType.ITEM:
          return this.userItemByCode(code);
        default:
          return {};
      }

    },
    resume() {
      this.$store.dispatch(ActionType.CONTINUE_INTERACTION)
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