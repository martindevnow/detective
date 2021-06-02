export default [
  { 
    id: 'TRIGGER_FOUND_WOMANS_PEN',
    label: `Found Miss Veeveeon's Pen`,
    causes: {
      event: 'CLUE_FOUND_PEN',
      eventDelay: 0,
      trigger: null,
      triggerDelay: 0,
    },
  },
  { 
    id: 'KNIFE_SUBMITTED',
    label: 'Knife Submitted for Analysis',
    causes: {
      trigger: 'KNIFE_ANALYZED',
      triggerDelay: 60,
    },
  },
  { 
    id: 'KNIFE_ANALYZED',
    label: 'Knife Analysis Complete',
    causes: null,
  }
];
