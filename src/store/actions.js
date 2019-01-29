import * as actionType from './action-types';
import * as mutationType from './mutation-types';

import * as PlayerStatus from '../models/player-status';
import * as utils from '../helpers/utils';
import * as qrType from '../models/qr-types';

export default {
  [actionType.SELECT_SCENARIO]: ({ commit }, id) => {
    commit(mutationType.SELECT_SCENARIO, id);
  },
  [actionType.SCAN_QR]: ({dispatch, state}, code) => {
    console.log(`[current.status] = ${state.current.status}`)
    switch (state.current.status) {
      case PlayerStatus.IDLE:
        dispatch(actionType.SCAN_QR_IDLE, code);
        break;
      case PlayerStatus.QUESTIONING: 
        dispatch(actionType.SCAN_QR_QUESTIONING, code);
        break;
      case PlayerStatus.SOLVING:
        dispatch(actionType.SCAN_QR_SOLVING, code);
        break;
      case PlayerStatus.SEARCHING:
      default:
        console.warning('User should not be able to scan while searching');
        break;          
    }
  },
  [actionType.SCAN_QR_IDLE]: ({commit}, code) => {
    switch (utils.getQRType(code)) {
      case qrType.LOCATION:
        commit(mutationType.TRAVEL_TO_LOCATION, code);
        break;
      case qrType.ITEM:
        commit(mutationType.INVESTIGATE_OBJECT, code);
        break;
      case qrType.CHARACTER:
        commit(mutationType.START_CONVERSATION, code);
        break;
    }
  },
  [actionType.SCAN_QR_QUESTIONING]: ({commit}, code) => {
    console.log(`[getQRType(${code})] = ${utils.getQRType(code)}`)
    switch (utils.getQRType(code)) {
      case qrType.LOCATION:
        commit(mutationType.CONFIRM_TRAVEL_TO_LOCATION, code);
        break;
      case qrType.ITEM:
      case qrType.SPECIAL:
      case qrType.CHARACTER:
        commit(mutationType.ASK_QUESTION, code);
        break;
    }
  },
  [actionType.SCAN_QR_SOLVING]: ({commit}, code) => {
    switch (utils.getQRType(code)) {
      case qrType.LOCATION:
      case qrType.ITEM:
      case qrType.SPECIAL:
      case qrType.CHARACTER:
        commit(mutationType.ANSWER_QUESTION, code);
        break;
    }
  },
  [actionType.RESUME]: ({state, commit}) => {
    switch(state.current.status) {
      case PlayerStatus.QUESTIONING:
        commit(mutationType.CLEAR_RESPONSE);
        break;
    }
    commit();
  },
  [actionType.SEARCH_FOR_CLUES]: ({state}) => {
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
