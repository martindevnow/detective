export default { 
  id: 'lnd1_c02', 
  name: 'Miss Veeveeon', 
  fallback: `Honestly, stupid questions don't deserve a reply..`,
  greetings: [
    {
      body: [`What do you want?? Make it quick!`],
    }
  ],
  questions: [
    { 
      topic: 'lnd1_i01', 
      enablingTriggers: ['FOUND_WOMANS_PEN'],
      body: [`OMG! Yes! I gave this to my lover! Where did you find it???`],
    },
  ]
};
