import {Enum} from 'enumify';

class InteractionType extends Enum {}
InteractionType.initEnum([
  'CLUE', 
  'EVENT', 
  'ITEM', 
  'MOVEMENT',
  'PERSON',
  'QUESTION',
  'SEARCH',
]);

export default InteractionType;