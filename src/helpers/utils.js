export const isLocation = (qrText) => {
  return qrText.slice(0, 6) === 'lnd1_l';
}