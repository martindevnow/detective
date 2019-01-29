import { Location } from "../models/location";

export const scenarios = (state) => state.scenarios;
export const scenario = (state) => state.current.scenario;
export const status = (state) => state.current.status;
export const location = (state) => state.current.location;
export const question = (state) => state.current.question;
export const response = (state) => state.current.response;
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