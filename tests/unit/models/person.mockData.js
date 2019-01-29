import { Person } from "../../../src/models/person";

export const mockPerson = new Person({ 
  id: 'lnd1_c01', 
  name: 'Captain Murphy', 
  fallback: `I can't be doing your job for you. Get out in the field and find out!`,
  questions: [
    { 
      topic: 'lnd1_c02',
      enablingTriggers: [],
      disablingTriggers: ['DO_SOMETHING_BAD', 'DO_SOMETHING_GOOD'],
      causesTriggers: [],     
      response: `DEFAULT`
    },
    { 
      topic: 'lnd1_c02',
      enablingTriggers: ['DO_SOMETHING_BAD'],
      disablingTriggers: ['DO_SOMETHING_GOOD'],
      causesTriggers: [],     
      response: `NOT_HAPPY` 
    },
    { 
      topic: 'lnd1_c02',
      enablingTriggers: ['DO_SOMETHING_GOOD'],
      disablingTriggers: ['DO_SOMETHING_BAD'],
      causesTriggers: [],     
      response: `VERY_HAPPY`
    },
    { 
      topic: 'lnd1_c02',
      enablingTriggers: ['DO_SOMETHING_GOOD', 'DO_SOMETHING_BAD'],
      disablingTriggers: [],
      causesTriggers: [],     
      response: `MIXED_FEELING`
    },
  ]
});
