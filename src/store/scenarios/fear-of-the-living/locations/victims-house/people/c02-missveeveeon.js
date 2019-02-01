export default { 
  id: 'lnd1_c02', 
  name: 'Miss Veeveeon', 
  fallback: `Honestly, stupid questions don't deserve a reply..`,
  greetings: [
    {
      enablingTriggers: [],
      disablingTriggers: [],
      body: [`What do you want?? Make it quick!`,],
    }
  ],
  questions: [
    { 
      topic: 'lnd1_i01', 
      pretriggers: [], 
      triggers: null,     
      body: [`I like to cook.`,],
    },
  ]
};
