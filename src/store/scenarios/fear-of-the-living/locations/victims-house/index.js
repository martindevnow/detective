import c02Missveeveeon from "./people/c02-missveeveeon";
import c03MrMartin from "./people/c03-mr-martin";

export default { 
  id: 'lnd1_lE', 
  name: `Victim's House`, 
  body: ['You walk in to find the deceased on the floor... the smell of rotting flesh makes your nose hairs curl... ',],
  search: { enablingTriggers: [], disablingTriggers: [] }, 
  items: [
    { 
      id: 'lnd1_i01', 
      name: 'Chef Knife', 
      causesTriggers: [

      ],
      info: `You found a chefs knife next to the body. Maybe they can tell you more about it at the lab.`,
    },
  ],
  people: [
    c02Missveeveeon,
    c03MrMartin,
  ]
};
