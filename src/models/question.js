export class Question {

  /**
   * Question Interface
   * @param {topic, enablingTriggers, disablingTriggers, causesTriggers, response} init 
   */

  constructor({topic, enablingTriggers, disablingTriggers, causesTriggers, response}) {
    this.topic = topic;
    this.enablingTriggers = enablingTriggers;
    this.disablingTriggers = disablingTriggers;
    this.causesTriggers = causesTriggers;
    this.response = response;
  }

  isDisabled(triggers) {
    // User has a Trigger that disables this Question
    if (this.disablingTriggers.some(disTrig => triggers.some(userTrig => userTrig === disTrig))) {
      return true;
    }
    // No triggers required for this Question
    if (this.enablingTriggers.length === 0) {
      return false;
    }
    // User has every trigger required to get this Question
    if (this.enablingTriggers.every(enabTrig => triggers.some(userTrig => userTrig === enabTrig))) {
      return false;
    }
    // User doesn't have every trigger required
    return true;
  }

  isEnabled(triggers) {
    return !this.isDisabled(triggers);
  }
}

/** 
 * Factory Function fron Person's Fallback Response 
 * (when asked about any topic)
 */
export const fromFallback = (topic, fallback) => {
  return new Question({
    topic: topic,
    enablingTriggers: [],
    disablingTriggers: [],
    causesTriggers: [],
    response: fallback,
  });
}