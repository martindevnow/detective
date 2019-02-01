export default { 
  id: 'lnd1_c03', 
  name: 'Mr Martin', 
  fallback: `I see too many faces on a daily basis to remember everyone I encounter.`,
  greetings: [
    {
      enablingTriggers: [],
      disablingTriggers: [],
      body: [`What can I do for you?`],
    }
  ],
  questions: [
    { 
      topic: 'lnd1_c02',
      enablingTriggers: [],
      disablingTriggers: [],
      causesTriggers: [],
      body: [`She's quite the looker. A woman that beautiful not tied down yet, something must be up.`],
    },
  ],
};
