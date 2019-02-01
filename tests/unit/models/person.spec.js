import { expect } from 'chai'
import mockScenarioData from '../../../src/store/scenarios/mock-scenario';
import { Scenario } from '../../../src/models/scenario';

const mockScenario = new Scenario(mockScenarioData);
const mockPerson = mockScenario.locations[0].people[0];

describe('Person Class', () => {
  it('returns the proper question for NO trigger', () => {
    const triggers = [];
    console.log(mockPerson.askAboutTopic('lnd1_c02', triggers));
    expect(mockPerson.askAboutTopic('lnd1_c02', triggers).answer)
      .to.equal('DEFAULT')
  });
  it('returns the proper question for GOOD trigger', () => {
    const triggers = ['DO_SOMETHING_GOOD'];
    expect(mockPerson.askAboutTopic('lnd1_c02', triggers).answer)
      .to.equal('VERY_HAPPY')
  });
  it('returns the proper question for BAD trigger', () => {
    const triggers = ['DO_SOMETHING_BAD'];
    expect(mockPerson.askAboutTopic('lnd1_c02', triggers).answer)
      .to.equal('NOT_HAPPY')
  });
  it('returns the proper question for GOOD and BAD trigger', () => {
    const triggers = ['DO_SOMETHING_GOOD', 'DO_SOMETHING_BAD'];
    expect(mockPerson.askAboutTopic('lnd1_c02', triggers).answer)
      .to.equal('MIXED_FEELING')
  });
});