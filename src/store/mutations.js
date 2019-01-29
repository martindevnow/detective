import * as mutationType from './mutation-types';
import * as PlayerStatus from '../models/player-status';

export default {
  [mutationType.SELECT_SCENARIO]: (state, id) => { 
    const scenario = state.scenarios.find(s => id === s.id);
    state.current = { ...state.current, scenario, location: scenario.locations.find(l => l.id === scenario.initialLocation) };
  },
  [mutationType.TRAVEL_TO_LOCATION]: (state, id) => {
    // travel to location
    // add time
    // check for triggers
    const location = state.current.scenario.locations.find(l => l.id === id);
    state.current = { 
      ...state.current, 
      status: PlayerStatus.IDLE, 
      minutesPassed: state.current.minutesPassed + 20,
      location 
    };
  },
  [mutationType.CONFIRM_TRAVEL_TO_LOCATION]: () => {

  },
  [mutationType.INVESTIGATE_OBJECT]: (state, id) => {
    // find object at location
    // if not, display a fall back message
    // otherwise,
    // display message and show found clue screen
    const item = state.location.items.find(i => i.id === id);
    if (! item) {
      // display a not found message
    }

    // check triggers required

    state.current = {
      ...state.current,
      items: [
        ...state.current.items,
        item,
      ]
    }

    // check for triggers tripped
  },
  [mutationType.FIND_CLUE]: () => {

  },
  [mutationType.START_CONVERSATION]: (state, id) => {
    // find user at this location
    // check for required triggers
    // if anyhting fails, enter a different state
    const person = state.current.location.people.find(p => p.id === id);
    if (!person) {
      // check if it is one of the lab techs (they can be called from anywhere)
      // otherwise
      // commit a mutation to tell the user this person isn't here right now
    }

    // check if a trigger causes the person to be absent

    // start conversation
    state.current = {
      ...state.current,
      status: PlayerStatus.QUESTIONING,
      person,
    };
  },
  [mutationType.STOP_CONVERSATION]: () => {

  },
  [mutationType.ASK_QUESTION]: () => {

  },
  [mutationType.CLEAR_RESPONSE]: (state) => {
    state.current = {
      ...state.current,
      response: '',
    };
  },
  [mutationType.ANSWER_QUESTION]: () => {

  },

  [mutationType.RESUME]: () => {

  },

};
