import MutationType from './mutation-type';
import InteractionType from '../enums/interaction-types';
import PlayerStatus from '../enums/player-status';
import { Person } from '../models/person';
import { Location } from '../models/location';

export default {
  [MutationType.SELECT_SCENARIO]: (state, id) => { 
    const scenario = state.scenarios.find(s => id === s.id);
    state.current = { 
      ...state.current, 
      scenario,
      interaction: InteractionType.MOVEMENT,
      location: new Location(scenario.locations.find(l => l.id === scenario.initLocation))
    };
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
      interaction: InteractionType.MOVEMENT,
    };
  },
  [MutationType.CONFIRM_TRAVEL_TO_LOCATION]: (state, id) => {
  
    // TODO: This should be different from above...
    const location = state.current.scenario.locations.find(l => l.id === id);
    state.current = { 
      ...state.current, 
      status: PlayerStatus.IDLE, 
      minutesPassed: state.current.minutesPassed + 20,
      location,
      interaction: InteractionType.MOVEMENT,
    };

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
      interaction: InteractionType.PERSON,
    };
  },
  [MutationType.STOP_CONVERSATION]: (state) => {
    state.current.person = null;
    state.current.status = PlayerStatus.IDLE;
    state.current.interaction = null;
  },
  [MutationType.ASK_QUESTION]: (state, code) => {
    console.log(`Currently talking to: ${ state.current.person.id}`);
    console.log(`Asking about: ${code}`)
    const question = state.current.person.askAboutTopic(code);
    state.current = {
      ...state.current,
      question,
      interaction: InteractionType.QUESTION,
    };
  },
  [MutationType.CLEAR_QUESTION]: (state) => {
    state.current = {
      ...state.current,
      question: null,
      interaction: null,
    };
  },
  [MutationType.ANSWER_QUESTION]: () => {

  },

  [MutationType.RESUME]: (state) => {
    state.current.question = null;
    state.current.interaction = null;
  },

};
