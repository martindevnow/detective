export default { 
  id: 'lnd1_c01', 
  name: 'Captain Murphy', 
  fallback: `I can't be doing your job for you. Get out in the field and find out!`,
  greetings: [
    {enablingTriggers: [], disablingTriggers: [], body: ['Hey again']},
  ],
  questions: [
    { 
      topic: 'lnd1_c02',
      enablingTriggers: [],
      disablingTriggers: ['DO_SOMETHING_BAD', 'DO_SOMETHING_GOOD'],
      causesTriggers: [],     
      body: `DEFAULT`
    },
    { 
      topic: 'lnd1_c02',
      enablingTriggers: ['DO_SOMETHING_BAD'],
      disablingTriggers: ['DO_SOMETHING_GOOD'],
      causesTriggers: [],     
      body: `NOT_HAPPY` 
    },
    { 
      topic: 'lnd1_c02',
      enablingTriggers: ['DO_SOMETHING_GOOD'],
      disablingTriggers: ['DO_SOMETHING_BAD'],
      causesTriggers: [],     
      body: `VERY_HAPPY`
    },
    { 
      topic: 'lnd1_c02',
      enablingTriggers: ['DO_SOMETHING_GOOD', 'DO_SOMETHING_BAD'],
      disablingTriggers: [],
      causesTriggers: [],     
      body: `MIXED_FEELING`
    },
  ]
};
