import * as qrTypes from '../models/qr-types';

export const isCharacter = (qrText) => {
  return qrText.slice(0,6) === 'lnd1_c';
}

export const isEvidence = (qrText) => {
  return isItem(qrText) || isSpecial(qrText);
}

export const isLocation = (qrText) => {
  return qrText.slice(0, 6) === 'lnd1_l';
}

export const isItem = (qrText) => {
  return qrText.slice(0,6) === 'lnd1_i';
}

export const isSpecial = (qrText) => {
  return qrText.slice(0,6) === 'lnd1_s';
}

export const getQRType = (qrText) => {
  if (isCharacter(qrText)) {
    return qrTypes.CHARACTER;
  }
  if (isItem(qrText)) {
    return qrText.ITEM;
  }
  if (isLocation(qrText)) {
    return qrTypes.LOCATION;
  }
  if (isSpecial(qrText)) {
    return qrTypes.SPECIAL;
  }
}