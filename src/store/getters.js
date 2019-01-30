import { Location } from "../models/location";
// import * as utils from '../helpers/utils';
import PlayerStatus from '../enums/player-status';

export const scenarios = (state) => state.scenarios;
export const scenario = (state) => state.current.scenario;
export const status = (state) => state.current.status;
export const person = (state) => state.current.person;
export const location = (state) => state.current.location;
export const question = (state) => state.current.question;
export const interaction = (state) => state.current.interaction;
export const canSearchCurrentLocation = (state) => {
  const location = new Location(state.current.location);
  return location.canSearch(state.current.triggers);
};
export const personByLocationAndId = (state) => (locationId, personId) => {
  const location = state.current.scenario.locations && state.current.scenario.locations.find(l => l.id === locationId);
  if (!location) {
    return null;
  }
  return location.people.find(p => p.id === personId);
};

export const personById = (state) => (personId) => {
  return personByLocationAndId(state)(state.current.location.id, personId);
};
// For any person in any location (used for asking ABOUT them)
export const personByCode = (state) => (code) => {
  const theirLocation = state.current.scenario.locations.find(l => {
    return l.people.some(p => p.id === code);
  });
  return theirLocation.people.find(person => person.id === code);
}

export const userIsIdle = (state) => state.current.status === PlayerStatus.IDLE;
export const userIsQuestioning = (state) => state.current.status === PlayerStatus.QUESTIONING;
export const userIsSearching = (state) => state.current.status === PlayerStatus.SEARCHING;
export const userIsSolving = (state) => state.current.status === PlayerStatus.SOLVING;