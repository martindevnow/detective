import { expect } from 'chai'
// import sinon from 'sinon';
import mutations from '../../../src/store/mutations';
import * as MutationType from '../../../src/store/mutation-type';
import * as PlayerStatus from '../../../src/enums/player-status';
import * as InteractionType from '../../../src/enums/interaction-types';

describe('mutations', () => {
  it(MutationType.SELECT_SCENARIO, () => {
    const state = {
      current: {},
      scenarios: [{id: 1, initLocation: 'lnd1_l01', locations: [
        {id: 'lnd1_l01', name: 'dummy', body: 'Dummy', search: {}, items: null, people: null}]}],
    };
    const scenarioId = 1;
    
    mutations[MutationType.SELECT_SCENARIO](state, scenarioId);
    expect(state.current).to.deep.equal({
      scenario: state.scenarios[0],
      location: state.scenarios[0].locations[0],
    });
  });

  it(MutationType.TRAVEL_TO_INITIAL_LOCATION, () => {
    const state = {
      current: {
        interactions: [],
        interactionContent: '',
        location: {body: 'This is the body'}
      }
    };

    mutations[MutationType.TRAVEL_TO_INITIAL_LOCATION](state);
    expect(state.current.interactions).to.deep.equal([InteractionType.MOVEMENT]);
    expect(state.current.interactionContent).to.equal(state.current.location.body);
  });

  describe(MutationType.TRAVEL_TO_LOCATION, () => {
    it('has empty interaction queue', () => {
      const state = {
        current: {
          status: PlayerStatus.IDLE,
          minutesPassed: 0,
          location: {},
          interactions: [],
          interactionContent: [],
          interactionContentIndex: 0,
          scenario: {
            locations: [
              {id: 'lnd1_lE', name: 'dummy', body: ['Dummy Body'], search: {}, people: null, items: null},
            ]
          }
        }
      };
      const locationId = 'lnd1_lE';
  
      mutations[MutationType.TRAVEL_TO_LOCATION](state, locationId);
      expect(state.current.location).to.deep.equal(state.current.scenario.locations[0]);
      expect(state.current.minutesPassed).to.equal(20);
      expect(state.current.interactions.length).to.equal(1);
      expect(state.current.interactionContent).to.deep.equal(['Dummy Body']);
      expect(state.current.interactionContentIndex).to.equal(0);
    });

    it('has stuff in the interaction queue', () => {
      const state = {
        current: {
          status: PlayerStatus.IDLE,
          minutesPassed: 0,
          location: {},
          interactions: ['SOMETHING_DONE'],
          interactionContent: ['My previous interaction'],
          interactionContentIndex: 0,
          scenario: {
            locations: [
              {id: 'lnd1_lE', name: 'dummy', body: 'Dummy Body', search: {}, people: null, items: null},
            ]
          }
        }
      };
      const locationId = 'lnd1_lE';
  
      mutations[MutationType.TRAVEL_TO_LOCATION](state, locationId);
      expect(state.current.location).to.deep.equal(state.current.scenario.locations[0]);
      expect(state.current.minutesPassed).to.equal(20);
      expect(state.current.interactions.length).to.equal(2);
      expect(state.current.interactionContent).to.deep.equal(['My previous interaction']);
      expect(state.current.interactionContentIndex).to.equal(0);
    });
  });

  it(MutationType.START_CONVERSATION, () => {
    const state = {
      current: {
        interactions: [],
        interactionContent: [],
        interactionContentIndex: 0,
        location: {id: 'lnd1_lE', name: 'dummy', body: 'Dummy Body', search: {}, people: [
          {id: 'lnd1_c01', name: 'Mr. mr', fallback: 'what???', questions: [{topic: 'lnd1_c22', body: ['response']}], greetings: [{body: 'hello'}] }
        ], items: null},
      }
    };
    const personId = 'lnd1_c01';

    mutations[MutationType.START_CONVERSATION](state, personId);
    expect(state).to.deep.equal(state);
  });

  // it(MutationType.CHANGE_ME_HERE, () => {
  //   const state = {};
  //   mutations[MutationType.CHANGE_ME_HERE](state);
  //   expect(state).to.deep.equal(state);
  // });
});