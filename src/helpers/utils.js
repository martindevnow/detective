import * as QRType from '../enums/qr-types';

export const isPerson = (code) => {
  return code.slice(0,6) === 'lnd1_c';
}

export const isEvidence = (code) => {
  return isItem(code) || isSpecial(code);
}

export const isLocation = (code) => {
  return code.slice(0, 6) === 'lnd1_l';
}

export const isItem = (code) => {
  return code.slice(0,6) === 'lnd1_i';
}

export const isSpecial = (code) => {
  return code.slice(0,6) === 'lnd1_s';
}

export const getQRType = (code) => {
  if (isPerson(code)) {
    return QRType.PERSON;
  }
  if (isItem(code)) {
    return QRType.ITEM;
  }
  if (isLocation(code)) {
    return QRType.LOCATION;
  }
  if (isSpecial(code)) {
    return QRType.SPECIAL;
  }
}