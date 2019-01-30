import ActionType from './action-type';
import MutationType from './mutation-type';

import PlayerStatus from '../enums/player-status';
import * as utils from '../helpers/utils';
import QRType from '../enums/qr-types';

export default {
  [ActionType.SELECT_SCENARIO]: ({ commit }, id) => {
    commit(MutationType.SELECT_SCENARIO, id);
  },
  [ActionType.SCAN_QR]: ({dispatch, state}, code) => {
    console.log(`[current.status] = ${state.current.status}`)
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
  [ActionType.SCAN_QR_IDLE]: ({commit}, code) => {
    switch (utils.getQRType(code)) {
      case QRType.LOCATION:
        commit(MutationType.TRAVEL_TO_LOCATION, code);
        break;
      case QRType.ITEM:
        commit(MutationType.INVESTIGATE_OBJECT, code);
        break;
      case QRType.PERSON:
        commit(MutationType.START_CONVERSATION, code);
        break;
    }
  },
  [ActionType.SCAN_QR_QUESTIONING]: ({commit}, code) => {
    switch (utils.getQRType(code)) {
      case QRType.LOCATION:
        commit(MutationType.CONFIRM_TRAVEL_TO_LOCATION, code);
        break;
      case QRType.ITEM:
      case QRType.SPECIAL:
      case QRType.PERSON:
        commit(MutationType.ASK_QUESTION, code);
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
  [ActionType.RESUME]: ({state, commit}) => {
    switch(state.current.status) {
      case PlayerStatus.QUESTIONING:
        commit(MutationType.STOP_CONVERSATION);
        break;
    }
    commit();
  },
  [ActionType.SEARCH_FOR_CLUES]: ({state}) => {
    const navTo = {name: 'survey', params: { 
      id: state.current.scenario.id, 
      location: state.current.location.id 
    }};

    this.$router.push(navTo);
    setTimeout(() => { 
      this.isSurveying = false;
      this.$router.back();
    }, 15000);
  }
};
