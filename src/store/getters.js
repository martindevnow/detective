export const scenarios = (state) => state.scenarios;
export const scenario = (state) => state.current.scenario;
export const status = (state) => state.current.status;
export const location = (state) => state.current.location;
export const response = (state) => state.current.response;
export const canSearchCurrentLocation = (state) => {
  if (! state.current.location.canSearch ) {
    return false;
  }
  if (state.current.location.canSearch && !state.current.location.canSearchTrigger) {
    return true;
  }
  if (state.current.triggers.find(t => t.id === state.current.location.canSearchTrigger )) {
    return true;
  }
  return false;
};
