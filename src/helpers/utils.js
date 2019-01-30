import QRType from '../enums/qr-types';

export const isPerson = (qrText) => {
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
  if (isPerson(qrText)) {
    return QRType.PERSON;
  }
  if (isItem(qrText)) {
    return QRType.ITEM;
  }
  if (isLocation(qrText)) {
    return QRType.LOCATION;
  }
  if (isSpecial(qrText)) {
    return QRType.SPECIAL;
  }
}