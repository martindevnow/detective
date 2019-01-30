import {Enum} from 'enumify';

class PlayerStatus extends Enum {}
PlayerStatus.initEnum([
  'IDLE', 
  'QUESTIONING', 
  'SEARCHING', 
  'SOLVING',
]);

export default PlayerStatus;