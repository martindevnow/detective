import { expect } from 'chai'
import sinon from 'sinon';
import actions from '../../../src/store/actions';
import * as ActionType from '../../../src/store/action-type';
import * as MutationType from '../../../src/store/mutation-type';
import * as PlayerStatus from '../../../src/enums/player-status';

describe('actions', () => {
  it(ActionType.SELECT_SCENARIO, () => {
    const commit = sinon.spy();
    const state = {};
    const id = 1;

    actions[ActionType.SELECT_SCENARIO]({commit, state}, id);

    expect(commit.args).to.deep.equal([
      [MutationType.SELECT_SCENARIO, id],
      [MutationType.TRAVEL_TO_INITIAL_LOCATION]
    ]);
  });

  it(ActionType.SCAN_QR, () => {
    const dispatch = sinon.spy();
    const state_idle = {current: {status: PlayerStatus.IDLE}};
    const state_questioning = {current: {status: PlayerStatus.QUESTIONING}};
    const state_solving = {current: {status: PlayerStatus.SOLVING}};
    const code = 'lnd1_c01';

    actions[ActionType.SCAN_QR]({dispatch, state: state_idle}, code);
    expect(dispatch.args).to.deep.equal([
      [ActionType.SCAN_QR_IDLE, code],
    ]);

    dispatch.resetHistory();

    actions[ActionType.SCAN_QR]({dispatch, state: state_questioning}, code);
    expect(dispatch.args).to.deep.equal([
      [ActionType.SCAN_QR_QUESTIONING, code],
    ]);

    dispatch.resetHistory();

    actions[ActionType.SCAN_QR]({dispatch, state: state_solving}, code);
    expect(dispatch.args).to.deep.equal([
      [ActionType.SCAN_QR_SOLVING, code],
    ]);

  });

  it(ActionType.SCAN_QR_IDLE, () => {
    const commit = sinon.spy();
    const code_location = 'lnd1_l01';
    const code_item = 'lnd1_i01';
    const code_character = 'lnd1_c01';

    actions[ActionType.SCAN_QR_IDLE]({commit}, code_location);
    expect(commit.args).to.deep.equal([
      [MutationType.TRAVEL_TO_LOCATION, code_location],
    ]);

    commit.resetHistory();

    actions[ActionType.SCAN_QR_IDLE]({commit}, code_item);
    expect(commit.args).to.deep.equal([
      [MutationType.INVESTIGATE_OBJECT, code_item],
    ]);

    commit.resetHistory();

    actions[ActionType.SCAN_QR_IDLE]({commit}, code_character);
    expect(commit.args).to.deep.equal([
      [MutationType.START_CONVERSATION, code_character],
    ]);
  });
  
  it(ActionType.SCAN_QR_QUESTIONING, () => {
    const commit = sinon.spy();
    const code_location = 'lnd1_l01';
    const code_item = 'lnd1_i01';
    const code_special = 'lnd1_s01';
    const code_character = 'lnd1_c01';

    actions[ActionType.SCAN_QR_QUESTIONING]({commit}, code_location);
    expect(commit.args).to.deep.equal([
      [MutationType.CONFIRM_TRAVEL_TO_LOCATION, code_location],
    ]);

    commit.resetHistory();

    actions[ActionType.SCAN_QR_QUESTIONING]({commit}, code_item);
    expect(commit.args).to.deep.equal([
      [MutationType.ASK_QUESTION, code_item],
    ]);

    commit.resetHistory();

    actions[ActionType.SCAN_QR_QUESTIONING]({commit}, code_character);
    expect(commit.args).to.deep.equal([
      [MutationType.ASK_QUESTION, code_character],
    ]);

    commit.resetHistory();

    actions[ActionType.SCAN_QR_QUESTIONING]({commit}, code_special);
    expect(commit.args).to.deep.equal([
      [MutationType.ASK_QUESTION, code_special],
    ]);
  });
  
  it(ActionType.SCAN_QR_SOLVING, () => {
    const commit = sinon.spy();
    const code_location = 'lnd1_l01';
    const code_item = 'lnd1_i01';
    const code_special = 'lnd1_s01';
    const code_character = 'lnd1_c01';

    actions[ActionType.SCAN_QR_SOLVING]({commit}, code_location);
    expect(commit.args).to.deep.equal([
      [MutationType.ANSWER_QUESTION, code_location],
    ]);

    commit.resetHistory();

    actions[ActionType.SCAN_QR_SOLVING]({commit}, code_item);
    expect(commit.args).to.deep.equal([
      [MutationType.ANSWER_QUESTION, code_item],
    ]);

    commit.resetHistory();

    actions[ActionType.SCAN_QR_SOLVING]({commit}, code_character);
    expect(commit.args).to.deep.equal([
      [MutationType.ANSWER_QUESTION, code_character],
    ]);

    commit.resetHistory();

    actions[ActionType.SCAN_QR_SOLVING]({commit}, code_special);
    expect(commit.args).to.deep.equal([
      [MutationType.ANSWER_QUESTION, code_special],
    ]);
  });

  it(ActionType.SAY_GOODBYE, () => {
    const commit = sinon.spy();

    actions[ActionType.SAY_GOODBYE]({commit});
    expect(commit.args).to.deep.equal([
      [MutationType.STOP_CONVERSATION]
    ]);
  });

  // it(ActionType.SEARCH_FOR_CLUES, () => {
  //   // const commit = sinon.spy();
  //   const state = {
  //     current: { 
  //       scenario: { 
  //         id: 1, 
  //       }, 
  //       location: { 
  //         id: 'lnd1_lE', 
  //       },
  //     }
  //   };

  //   actions[ActionType.SEARCH_FOR_CLUES]({state});
  //   expect()
  // });
  
});
