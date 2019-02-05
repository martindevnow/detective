import * as MutationType from './mutation-type';
import * as InteractionType from '../enums/interaction-types';
import * as PlayerStatus from '../enums/player-status';
import { Person } from '../models/person';
import { Location } from '../models/location';

export default {
  [MutationType.SELECT_SCENARIO]: (state, id) => { 
    const scenario = state.scenarios.find(s => id === s.id);
    state.current = { 
      ...state.current, 
      scenario,
      location: new Location(scenario.locations.find(l => l.id === scenario.initLocation))
    };
  },

  [MutationType.TRAVEL_TO_INITIAL_LOCATION]: (state) => {
    state.current.interactions.push(InteractionType.MOVEMENT);
    state.current.interactionContent = state.current.location.body;
  },

  [MutationType.TRAVEL_TO_LOCATION]: (state, id) => {
    // travel to location
    // add time
    // check for triggers
    const location = state.current.scenario.locations.find(l => l.id === id);
    state.current = { 
      ...state.current, 
      status: PlayerStatus.IDLE, 
      minutesPassed: state.current.minutesPassed + 20,
      location,
    };
    state.current.interactions.push(InteractionType.MOVEMENT);
    if (state.current.interactions.length === 1) {
      state.current.interactionContent = location.body;
      state.current.interactionContentIndex = 0;
    }
  },

  [MutationType.CONFIRM_TRAVEL_TO_LOCATION]: (state, id) => {
  
    // TODO: This should be different from above...
    const location = state.current.scenario.locations.find(l => l.id === id);
    state.current = { 
      ...state.current, 
      status: PlayerStatus.IDLE, 
      minutesPassed: state.current.minutesPassed + 20,
      location,
    };
    state.current.interactions.push(InteractionType.MOVEMENT);
    if (state.current.interactions.length === 1) {
      state.current.interactionContent = location.body;
      state.current.interactionContentIndex = 0;
    }
  },

  [MutationType.INVESTIGATE_OBJECT]: (state, id) => {
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

  [MutationType.FIND_CLUE]: () => {

  },

  [MutationType.START_CONVERSATION]: (state, id) => {
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
      person: new Person(person),
    };
    state.current.interactions.push(InteractionType.PERSON)
    if (state.current.interactions.length === 1) {
      // add to content
      state.current.interactionContent = state.current.person.getGreeting(state.current.triggers).body;
      state.current.interactionContentIndex = 0;
    }
  },

  [MutationType.STOP_CONVERSATION]: (state) => {
    state.current.person = null;
    state.current.status = PlayerStatus.IDLE;
  },

  [MutationType.ASK_QUESTION]: (state, code) => {
    const question = state.current.person.askAboutTopic(code);
    state.current = {
      ...state.current,
      question,
    };
    state.current.interactions.push(InteractionType.QUESTION);
    if (state.current.interactions.length === 1) {
      state.current.interactionContent = question.body;
      state.current.interactionContentIndex = 0;
    }
  },

  [MutationType.ANSWER_QUESTION]: () => {

  },

  [MutationType.NEXT_INTERACTION]: (state) => {
    console.log('current interactions', state.current.interactions)

    // remove previous interaction
    state.current.interactions = state.current.interactions.slice(1);
    // reset index
    state.current.interactionContentIndex = 0;

    // load next interaction
    if (state.current.interactions.length === 0) {
      state.current.interactionContent = [];
    } else {
      state.current.interactionContent = state.current.interactions[0].body;
    }
    console.log('remaining interactions', state.current.interactions);
  
  },

  [MutationType.CONTINUE_INTERACTION]: (state) => {
    // contnue to next page of this interaction
    state.current.interactionContentIndex = state.current.interactionContentIndex + 1;
  },

  [MutationType.CLEAR_INTERACTIONS]: (state) => {
    // remove all interactions
    state.current.interactions = [];
    // reset content
    state.current.interactionContent = [];
    // and index
    state.current.interactionContentIndex = 0;
  }

};
