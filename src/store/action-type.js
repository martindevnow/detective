import {Enum} from 'enumify';

class ActionType extends Enum {}
ActionType.initEnum([
  'SELECT_SCENARIO', 
  'SCAN_QR', 
  'SCAN_QR_IDLE', 
  'SCAN_QR_QUESTIONING',
  'SCAN_QR_SOLVING',
  'RESUME',
  'SEARCH_FOR_CLUES',
]);

export default ActionType;