export class Question {

  /**
   * Question Interface
   * @param {topic, enablingTriggers, disablingTriggers, causesTriggers, body} init 
   */

  constructor({topic, enablingTriggers, disablingTriggers, causesTriggers, body}, personId) {

    if (!topic || !body || !personId) {
      console.error({topic, enablingTriggers, disablingTriggers, causesTriggers, body, personId});
      throw new Error('[Question] requires a topic, body and personID');
    }

    this.topic = topic;
    this.enablingTriggers = enablingTriggers;
    this.disablingTriggers = disablingTriggers;
    this.causesTriggers = causesTriggers;
    this.body = body;
    this.personId = personId;
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
 * Factory Function fron Person's Fallback body 
 * (when asked about any topic)
 */
export const fromFallback = (topic, person) => {
  return new Question({
    topic: topic,
    enablingTriggers: [],
    disablingTriggers: [],
    causesTriggers: [],
    body: [person.fallback],
  }, person.id);
}