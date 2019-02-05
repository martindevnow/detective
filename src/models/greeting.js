export class Greeting {

  constructor({enablingTriggers, disablingTriggers, body}, personId) {
    if (!body || !personId) {
      throw new Error('[Greeting] needs a body and a PersonID');
    }

    this.enablingTriggers = enablingTriggers || null;
    this.disablingTriggers = disablingTriggers || null;
    this.body = body;
    this.personId = personId;
  }

  isDisabled(triggers) {
    // User has a Trigger that disables this Greeting
    if (this.disablingTriggers && this.disablingTriggers.some(disTrig => triggers.some(userTrig => userTrig === disTrig))) {
      return true;
    }
    // No triggers required for this Greeting
    if (! this.enablingTriggers || this.enablingTriggers.length === 0) {
      return false;
    }
    // User has every trigger required to get this Greeting
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