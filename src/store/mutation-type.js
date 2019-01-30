import {Enum} from 'enumify';

class MutationType extends Enum {}
MutationType.initEnum([
  'SELECT_SCENARIO', 
  'TRAVEL_TO_LOCATION', 
  'CONFIRM_TRAVEL_TO_LOCATION', 
  'INVESTIGATE_OBJECT',
  'START_CONVERSATION',
  'STOP_CONVERSATION',
  'FIND_CLUE',
  'ASK_QUESTION',
  'CLEAR_QUESTION',
  'ANSWER_QUESTION',
  'RESUME',
]);

export default MutationType;