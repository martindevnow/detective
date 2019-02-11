import * as ActionType from './action-type';
import * as MutationType from './mutation-type';

import * as PlayerStatus from '../enums/player-status';
import * as utils from '../helpers/utils';
import * as QRType from '../enums/qr-types';

export default {
  [ActionType.SELECT_SCENARIO]: ({ commit }, id) => {
    commit(MutationType.SELECT_SCENARIO, id);
    commit(MutationType.TRAVEL_TO_INITIAL_LOCATION);
  },
  [ActionType.SCAN_QR]: ({dispatch, state}, code) => {
    switch (state.current.status) {
      case PlayerStatus.IDLE:
        dispatch(ActionType.SCAN_QR_IDLE, code);
        break;
      case PlayerStatus.QUESTIONING: 
        dispatch(ActionType.SCAN_QR_QUESTIONING, code);
        break;
      case PlayerStatus.SOLVING:
        dispatch(ActionType.SCAN_QR_SOLVING, code);
        break;
      case PlayerStatus.SEARCHING:
      default:
        console.warning('User should not be able to scan while searching');
        break;          
    }
  },
  [ActionType.SCAN_QR_IDLE]: ({commit, dispatch}, code) => {
    switch (utils.getQRType(code)) {
      case QRType.LOCATION:
        commit(MutationType.TRAVEL_TO_LOCATION, code);
        break;
      case QRType.ITEM:
        commit(MutationType.INVESTIGATE_OBJECT, code);
        break;
      case QRType.PERSON:
        commit(MutationType.START_CONVERSATION, code);
        dispatch(ActionType.CHECK_FOR_TRIGGERS, { type: 'GREETING', code });
        break;
    }
  },
  [ActionType.SCAN_QR_QUESTIONING]: ({commit, dispatch}, code) => {
    switch (utils.getQRType(code)) {
      case QRType.LOCATION:
        commit(MutationType.CONFIRM_TRAVEL_TO_LOCATION, code);
        break;
      case QRType.ITEM:
      case QRType.SPECIAL:
      case QRType.PERSON:
        commit(MutationType.ASK_QUESTION, code);
        dispatch(ActionType.CHECK_FOR_TRIGGERS, { type: 'QUESTION', code });
        break;
    }
  },
  [ActionType.SCAN_QR_SOLVING]: ({commit}, code) => {
    switch (utils.getQRType(code)) {
      case QRType.LOCATION:
      case QRType.ITEM:
      case QRType.SPECIAL:
      case QRType.PERSON:
        commit(MutationType.ANSWER_QUESTION, code);
        break;
    }
  },
  [ActionType.SAY_GOODBYE]: ({commit}) => {
    // TODO: anything else required here?
    // Maybe remove this action if it's not needed... just use mutation
    commit(MutationType.STOP_CONVERSATION);
  },

  [ActionType.CONTINUE_INTERACTION]: ({state, commit}) => {
    if (state.current.interactionContentIndex + 1 >= state.current.interactionContent.length) {
      // this interaction is over
      if (state.current.interactions.length > 1) {
        return commit(MutationType.NEXT_INTERACTION);
      }
      return commit(MutationType.CLEAR_INTERACTIONS);
    }
    return commit(MutationType.CONTINUE_INTERACTION);
  },

  [ActionType.SEARCH_FOR_CLUES]: ({state}) => {
    // TODO: Add in logic to prevent this ...
    // ... if the location is not searchable
    const navTo = {name: 'survey', params: { 
      id: state.current.scenario.id, 
      location: state.current.location.id 
    }};

    this.$router.push(navTo);
    setTimeout(() => { 
      this.isSurveying = false;
      this.$router.back();
    }, 15000);
  },

  [ActionType.CHECK_FOR_TRIGGERS]: ({commit, state}, { type, code }) => {
    const existingTriggers = state.current.triggers;
    let question;
    let greeting;
    let triggerIds;

    // Trigger when greeting someone
    switch (type) {
      // Trigger when greeting someone
      case "GREETING":
        console.log(' > GREETING')
        // Check if the guest has any triggers that are toggled by greeting them
        greeting = state.current.person.getGreeting(existingTriggers);
        triggerIds = greeting.causesTriggers.filter(qt => {
          return existingTriggers.indexOf(qt.id) === -1;
        });
        break;
      // Trigger when asking a question
      case "QUESTION":
        console.log(' > QUESTION')
        // Check for the current person,
        question = state.current.person.askAboutTopic(code, existingTriggers);
        triggerIds = question.causesTriggers.filter(qt => {
          return existingTriggers.indexOf(qt.id) === -1;
        });
        break;
      default:
        break;
    }

    if (!triggerIds.length) {
      return;
    }

    triggerIds
      .map(tId => state.current.scenario.triggers.find(findT => findT.id === tId))
      .forEach(t => {
      console.log('Toggling - ', t);
      commit(MutationType.TOGGLE_TRIGGER, t);
    });
    // Toggle the triggers in triggers Array.
    

    // 3. Movement triggers
    // These are triggers caused by leaving or
  }
};
