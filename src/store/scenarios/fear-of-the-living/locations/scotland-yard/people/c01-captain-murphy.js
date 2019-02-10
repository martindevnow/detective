export default { 
  id: 'lnd1_c01', 
  name: 'Captain Murphy', 
  fallback: `I can't be doing your job for you. Get out in the field and find out!`,
  greetings: [
    {
      enablingTriggers: [],
      disablingTriggers: [],
      causesTriggers: [],
      body: [
        `Thank god you're finally here. It's been a shit show since the mayor's daughter has been kidnapped.`, 
        `I've been calling your phone all morning. She was reported missing at 6:35AM. She could be anywhere by now.`,
      ]
    }
  ],
  questions: [
    { 
      topic: 'lnd1_c02',
      enablingTriggers: [],
      disablingTriggers: [],
      causesTriggers: ['TRIGGER_FOUND_WOMANS_PEN'],
      body: [
        `She's quite the looker. A woman that beautiful not tied down yet, something must be up.`,
        `Here, take this with you. She left it behind at the scene of the crime (i01)`,
      ],
    },
  ]
};
