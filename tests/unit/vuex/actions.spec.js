import { expect } from 'chai'
import sinon from 'sinon';
import actions from '../../../src/store/actions';
import * as ActionType from '../../../src/store/action-type';
import * as MutationType from '../../../src/store/mutation-type';
import * as PlayerStatus from '../../../src/enums/player-status';
import { Person } from '../../../src/models/person';

describe('actions', () => {
  let commit, state, dispatch;

  beforeEach(() => {
    commit = sinon.spy();
    dispatch = sinon.spy();
  });

  describe(ActionType.SELECT_SCENARIO, () => {
    it('can select a scenario by ID', () => {
      state = {};
      const id = 1;

      actions[ActionType.SELECT_SCENARIO]({commit, state}, id);

      expect(commit.args).to.deep.equal([
        [MutationType.SELECT_SCENARIO, id],
        [MutationType.TRAVEL_TO_INITIAL_LOCATION]
      ]);
    });
  });

  describe(ActionType.SCAN_QR, () => {
    const code = 'lnd1_c01';

    it('can determine if IDLE', () => {
      state = {current: {status: PlayerStatus.IDLE}};

      actions[ActionType.SCAN_QR]({dispatch, state: state}, code);
      expect(dispatch.args).to.deep.equal([
        [ActionType.SCAN_QR_IDLE, code],
      ]);
    });

    it('can determine if QUESTIONING', () => {
      state = {current: {status: PlayerStatus.QUESTIONING}};

      actions[ActionType.SCAN_QR]({dispatch, state: state}, code);
      expect(dispatch.args).to.deep.equal([
        [ActionType.SCAN_QR_QUESTIONING, code],
      ]);
    });

    it('can determine if SOLVING', () => {
      state = {current: {status: PlayerStatus.SOLVING}};

      actions[ActionType.SCAN_QR]({dispatch, state: state}, code);
      expect(dispatch.args).to.deep.equal([
        [ActionType.SCAN_QR_SOLVING, code],
      ]);
    });
  });

  describe(ActionType.SCAN_QR_IDLE, () => {
    it('can scan LOCATION while IDLE', () => {
      const code = 'lnd1_l01';

      actions[ActionType.SCAN_QR_IDLE]({commit, dispatch}, code);
      expect(commit.args).to.deep.equal([
        [MutationType.TRAVEL_TO_LOCATION, code],
      ]);
    });

    it('can scan ITEM while IDLE', () => {
      const code = 'lnd1_i01';

      actions[ActionType.SCAN_QR_IDLE]({commit, dispatch}, code);
      expect(commit.args).to.deep.equal([
        [MutationType.INVESTIGATE_ITEM, code],
      ]);
    });

    it('can scan PERSON while IDLE', () => {
      const code = 'lnd1_c01';

      actions[ActionType.SCAN_QR_IDLE]({commit, dispatch}, code);
      expect(commit.args).to.deep.equal([
        [MutationType.START_CONVERSATION, code],
      ]);
      expect(dispatch.args).to.deep.equal([
        [ActionType.CHECK_FOR_TRIGGERS, { type: 'GREETING' }],
      ]);
    });
  });
  
  describe(ActionType.SCAN_QR_QUESTIONING, () => {
    it('can CONFIR_TRAVEL_TO_LOCATION while QUESTIONING', () => {
      const code = 'lnd1_l01';

      actions[ActionType.SCAN_QR_QUESTIONING]({commit, dispatch}, code);
      expect(commit.args).to.deep.equal([
        [MutationType.CONFIRM_TRAVEL_TO_LOCATION, code],
      ]);
    });
    it('can ASK_QUESTION about ITEM while QUESTIONING', () => {
      const code = 'lnd1_i01';

      actions[ActionType.SCAN_QR_QUESTIONING]({commit, dispatch}, code);
      expect(commit.args).to.deep.equal([
        [MutationType.ASK_QUESTION, code],
      ]);
      expect(dispatch.args).to.deep.equal([
        [ActionType.CHECK_FOR_TRIGGERS, { type: 'QUESTION', code: code }],
      ]);
    });

    it('can ASK_QUESTION about PERSON while QUESTIONING', () => {
      const code = 'lnd1_c01';

      actions[ActionType.SCAN_QR_QUESTIONING]({commit, dispatch}, code);
      expect(commit.args).to.deep.equal([
        [MutationType.ASK_QUESTION, code],
      ]);
      expect(dispatch.args).to.deep.equal([
        [ActionType.CHECK_FOR_TRIGGERS, { type: 'QUESTION', code: code }],
      ]);
    });

    it('can ASK_QUESTION about SPECIAL while QUESTIONING', () => {
      const code = 'lnd1_s01';

      actions[ActionType.SCAN_QR_QUESTIONING]({commit, dispatch}, code);
      expect(commit.args).to.deep.equal([
        [MutationType.ASK_QUESTION, code],
      ]);
      expect(dispatch.args).to.deep.equal([
        [ActionType.CHECK_FOR_TRIGGERS, { type: 'QUESTION', code: code }],
      ]);
    });
  });
  
  describe(ActionType.SCAN_QR_SOLVING, () => {
    it('works', () => {
      const commit = sinon.spy();
      const code_location = 'lnd1_l01';
      const code_item = 'lnd1_i01';
      const code_special = 'lnd1_s01';
      const code_person = 'lnd1_c01';

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

      actions[ActionType.SCAN_QR_SOLVING]({commit}, code_person);
      expect(commit.args).to.deep.equal([
        [MutationType.ANSWER_QUESTION, code_person],
      ]);

      commit.resetHistory();

      actions[ActionType.SCAN_QR_SOLVING]({commit}, code_special);
      expect(commit.args).to.deep.equal([
        [MutationType.ANSWER_QUESTION, code_special],
      ]);
    });
  });

  describe(ActionType.SAY_GOODBYE, () => {
    it('works', () => {
      const commit = sinon.spy();

      actions[ActionType.SAY_GOODBYE]({commit});
      expect(commit.args).to.deep.equal([
        [MutationType.STOP_CONVERSATION]
      ]);
    });
  });

  describe(ActionType.CHECK_FOR_TRIGGERS, () => {
    it('can CHECK_FOR_TRIGGERS on a GREETING', () => {
      const commit = sinon.spy();
      const state = {
        current: { 
          scenario: { 
            id: 1,
            triggers: []
          }, 
          location: { 
            id: 'lnd1_lE', 
          },
          person: new Person({
            id: 'lnd1_c01',
            name: 'Ben',
            fallback: 'I dont know',
            greetings: [
              {
                body: ['Hello'],
                causesTriggers: ['MET_BEN']
              }
            ],
            questions: [
              {
                topic: 'lnd1_c01',
                body: ['I know who I am'],
                personId: 'lnd1_c01',
              }
            ]
          }),
          triggers: [
            {
              id: 'MET_BEN',
              label: 'You Met Ben',
            }
          ],
        }
      };
      const type = 'GREETING';
      const code = ''

      actions[ActionType.CHECK_FOR_TRIGGERS]({state, commit}, {type, code});
      expect(commit.args).to.deep.equal([
        [MutationType.TOGGLE_TRIGGER, state.current.scenario.triggers[0]]
      ]);
    });
  });

  // describe(ActionType.SEARCH_FOR_CLUES, () => {
  //   it('works', () => {
  //     const commit = sinon.spy();
  //     const state = {
  //       current: { 
  //         scenario: { 
  //           id: 1, 
  //         }, 
  //         location: { 
  //           id: 'lnd1_lE', 
  //         },
  //       }
  //     };

  //     actions[ActionType.SEARCH_FOR_CLUES]({state, commit});
  //     expect()
  //   });
  // });
  
});
