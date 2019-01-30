import { Question, fromFallback } from "../../../src/models/question";
import { expect } from 'chai'
import { mockPerson } from "./person.mockData";

describe('Question Model', () => {

  describe('isDisabled and isEnabled', () => {

    it('returns disabled if disabled', () => {
      let q = new Question({ 
        topic: 'lnd1_c02',
        enablingTriggers: [],
        disablingTriggers: ['LOST_ITEM_ONE'],
        causesTriggers: [],     
        answer: `She's quite the looker. A woman that beautiful not tied down yet, something must be up.` 
      }, mockPerson.id);
      expect(q.isDisabled(['LOST_ITEM_ONE'])).to.equal(true);
      expect(q.isDisabled([])).to.equal(false);
      expect(q.isEnabled(['LOST_ITEM_ONE'])).to.equal(false);
      expect(q.isEnabled([])).to.equal(true);
    });
  
    it('returns enabled if enabled', () => {
      let q = new Question({ 
        topic: 'lnd1_c02',
        enablingTriggers: ['FOUND_ITEM_ONE'],
        disablingTriggers: [],
        causesTriggers: [],     
        answer: `She's quite the looker. A woman that beautiful not tied down yet, something must be up.` 
      }, mockPerson.id);
      expect(q.isDisabled(['FOUND_ITEM_ONE'])).to.equal(false);
      expect(q.isDisabled([])).to.equal(true);
      expect(q.isEnabled(['FOUND_ITEM_ONE'])).to.equal(true);
      expect(q.isEnabled([])).to.equal(false);
    });
  
    it('returns enabled if nothing required', () => {
      let q = new Question({ 
        topic: 'lnd1_c02',
        enablingTriggers: [],
        disablingTriggers: [],
        causesTriggers: [],     
        answer: `She's quite the looker. A woman that beautiful not tied down yet, something must be up.` 
      }, mockPerson.id);
      expect(q.isDisabled(['LOST_ITEM_ONE'])).to.equal(false);
      expect(q.isDisabled([])).to.equal(false);
      expect(q.isEnabled(['FOUND_ITEM_ONE'])).to.equal(true);
      expect(q.isEnabled([])).to.equal(true);
    });
  
    it('Disabled takes priority over Enabled', () => {
      let q = new Question({ 
        topic: 'lnd1_c02',
        enablingTriggers: ['FOUND_ITEM_ONE'],
        disablingTriggers: ['LOST_ITEM_ONE'],
        causesTriggers: [],     
        answer: `She's quite the looker. A woman that beautiful not tied down yet, something must be up.` 
      }, mockPerson.id);
      expect(q.isDisabled(['FOUND_ITEM_ONE', 'LOST_ITEM_ONE'])).to.equal(true);
      expect(q.isDisabled(['LOST_ITEM_ONE'])).to.equal(true);
      expect(q.isDisabled([])).to.equal(true);
      expect(q.isEnabled(['FOUND_ITEM_ONE', 'LOST_ITEM_ONE'])).to.equal(false);
      expect(q.isEnabled(['FOUND_ITEM_ONE'])).to.equal(true);
      expect(q.isEnabled([])).to.equal(false);
    });

  });

});
  

describe('fromFallback Factory Function', () => {
  it('creates a basic question from a fallback answer', () => {
    const question = fromFallback('ABCD', mockPerson);
    expect(question.isEnabled([])).to.equal(true);
    expect(question.answer).to.equal(mockPerson.fallback);
  });
});