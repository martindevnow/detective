import scotlandYard from './locations/scotland-yard';
import victimsHouse from './locations/victims-house';
import modelingAgency from './locations/modeling-agency';
import triggers from './triggers';

export default { 
  id: 1, 
  name: 'Fear the Living', 
  introText: 'You walk into the lorem ipsum dolor sit amet', 
  initLocation: scotlandYard.id,
  locations: [
    scotlandYard,
    victimsHouse,
    modelingAgency,
  ],
  techs: [
    { 
      id: 'lnd1_lab',  // need to verify
      name: 'Lab Tech',
      fallback: `I wasn't able to find anything of any significance to the case.`,
      questions: [
        {
          topic: 'lnd1_i01',
          enablingTriggers: [],
          disablingTriggers: [],
          causesTriggers: [],
          body: [`Wow, looks like this could do some damage. It'll take some time to analyze. Call back in an hour.`]
        },
        { 
          topic: 'lnd1_i01',
          enablingTriggers: [],
          disablingTriggers: [],
          causesTriggers: [],
          body: [`The results of the analysis are in. It seems there are 2 sets of fingerprints. One set belogs to the victim, and the other set is not in our database. The blood belogs to our victim. Hope this was informative!`]
        },
      ],
    },
  ],
  events: [
    { 
      id: 'CLUE_FOUND_PEN', 
      name: '', 
      givesItems: ['lnd1_i01'] },
  ],
  triggers: triggers,
};
