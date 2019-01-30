import * as PlayerStatus from '../models/player-status';

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
    { 
      id: 1, 
      name: 'Fear the Living', 
      introText: 'You walk into the lorem ipsum dolor sit amet', 
      initLocation: 'lnd1_l01',
      locations: [
        { 
          id: 'lnd1_l01', 
          name: 'Scotland Yard', 
          initDescription: 'Scotlandyard is eerily quiet this morning. You can tell there is tension in the air. Considering the captains daughter has been kidnapped, you understand why... ', 
          search: { enablingTriggers: [], disablingTriggers: [] }, 
          people: [
            { 
              id: 'lnd1_c01', 
              name: 'Captain Murphy', 
              fallback: `I can't be doing your job for you. Get out in the field and find out!`,
              greetings: [
                {
                  enablingTriggers: [],
                  disablingTriggers: [],
                  body: `Thank god you're finally here. It's been a shit show since the mayor's daughter has been kidnapped. I've been calling your phone all morning. She was reported missing at 6:35AM. She could be anywhere by now.`
                }
              ],
              questions: [
                { 
                  topic: 'lnd1_c02',
                  enablingTriggers: [],
                  disablingTriggers: [],
                  causesTriggers: [],
                  answer: `She's quite the looker. A woman that beautiful not tied down yet, something must be up.` 
                },

              ]
            },
          ]
        },
        { 
          id: 'lnd1_lE', 
          name: `Victim's House`, 
          initDescription: 'You walk in to find the deceased on the floor... the smell of rotting flesh makes your nose hairs curl... ', 
          search: { enablingTriggers: [], disablingTriggers: [] }, 
          items: [
            { 
              id: 'lnd1_i01', 
              name: 'Chef Knife', 
              causesTriggers: [],
              info: `You found a chefs knife next to the body. Maybe they can tell you more about it at the lab.`,
            },
          ],
          people: [
            { 
              id: 'lnd1_c02', 
              name: 'Miss Veeveeon', 
              fallback: `Honestly, stupid questions don't deserve a answer..`,
              greetings: [
                {
                  enablingTriggers: [],
                  disablingTriggers: [],
                  body: `What do you want?? Make it quick!`,
                }
              ],
              questions: [
                { 
                  topic: 'lnd1_i01', 
                  pretriggers: [], 
                  triggers: null,     
                  answer: `I like to cook.`,
                },
              ]
            },
            { 
              id: 'lnd1_c03', 
              name: 'Mr Martin', 
              fallback: `I see too many faces on a daily basis to remember everyone I encounter.`,
              greetings: [
                {
                  enablingTriggers: [],
                  disablingTriggers: [],
                  body: `What can I do for you?`
                }
              ],
              questions: [

              ],
            },
          ]
        },
        { 
          id: 'lnd1_lG', 
          name: 'Modeling Agency' 
        },
      ],
      people: [
        { 
          id: 'lnd1_lab', 
          name: 'Lab Tech', 
          fallback: `I wasn't able to find anything of any significance to the case.`,
          questions: [
            { suspect: 'lnd1_lab', topic: 'lnd1_i01', pretriggers: [], triggers: 1,        answer: `Wow, looks like this could do some damage. It'll take some time to analyze. Call back in an hour.` },
            { suspect: 'lnd1_lab', topic: 'lnd1_i01', pretriggers: [1, 2], triggers: null, answer: `The results of the analysis are in. It seems there are 2 sets of fingerprints. One set belogs to the victim, and the other set is not in our database. The blood belogs to our victim. Hope this was informative!` },
          ],
        },
      ],

      events: [
        { id: 1, name: 'Knife Analysis Completed', triggers: 2 },
      ],
      triggers: [
        { id: 1, label: 'Knife Submitted for Analysis', causeEvent: 1,    delay: 60 },
        { id: 2, label: 'Knife Analysis Complete',      causeEvent: null, delay: 0 }
      ]
    },
  ],
};
