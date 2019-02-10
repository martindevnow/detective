import * as MutationType from './mutation-type';
import * as InteractionType from '../enums/interaction-types';
import * as PlayerStatus from '../enums/player-status';
import { Person } from '../models/person';
import { Location } from '../models/location';

const updateCurrentInteractions = (state, interaction) => {
  if (state.current.interactions.length === 1) {
    state.current.interactionContent = interaction.body;
    state.current.interactionContentIndex = 0;
  }
};

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
    updateCurrentInteractions(state, location);
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
    updateCurrentInteractions(state, location);
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
    const greeting = state.current.person.getGreeting(state.current.triggers);
    updateCurrentInteractions(state, greeting);
  },

  [MutationType.STOP_CONVERSATION]: (state) => {
    state.current.person = null;
    state.current.status = PlayerStatus.IDLE;
  },

  [MutationType.ASK_QUESTION]: (state, code) => {
    const question = state.current.person.askAboutTopic(code);
    state.current = {
      ...state.current,
      minutesPassed: (state.current.minutesPassed + 5),
      question,
    };
    state.current.interactions.push(InteractionType.QUESTION);
    updateCurrentInteractions(state, question);
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
  },

  [MutationType.TOGGLE_TRIGGER]: (state, trigger) => {
    if (state.current.triggers.find(t => t.id === trigger.id)) {
      return;
    }
    state.current.triggers.push({
      ...trigger,
      triggeredAt: state.current.minutesPassed,
    })
  }
  

};
