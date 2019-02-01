import PlayerStatus from '../enums/player-status';

import fearOfTheLiving from './scenarios/fear-of-the-living';
/**
 * Types of Cards to Scan:
 * # Locations
 * These QR codes are prefixed with `lnd1_l` and followed by the letter on the card.
 * The one exception to this is the HOME (Scotland Yard) card. That card's QR
 * is `lnd1_l01`, everyone after is `lnd1_lA`, `lnd_lB
 * 
 * # People
 * These QR code are prefixed with `lnd1_c` followed by the number on the card,
 * padded with 0s like `lnd1_c01` to `lnd1_c55`
 * 
 * # Evidence
 * These QR codes are prefixed with `lnd1_i` followed by the number on the card,
 * padded with 0s like `lnd1_i01` to `lnd1_i37`
 * 
 * # Special Cards
 * These QR codes are prefixed with `lnd1_s` followed by the number on the card,
 * padded with 0s like `lnd1_s01` to `lnd1_s15`
 */

export default {
  current: {
    status: PlayerStatus.IDLE,
    scenario: {},
    triggers: [],
    location: {},
    items: [],
    person: {},
    minutesPassed: 0,
    question: null,
    interaction: null,
  },
  scenarios: [
    fearOfTheLiving,
  ],
};
