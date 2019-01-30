import {Enum} from 'enumify';

class QRType extends Enum {}
QRType.initEnum([
  'PERSON', 
  'LOCATION', 
  'ITEM', 
  'SPECIAL',
  'EVIDENCE',
]);

export default QRType;