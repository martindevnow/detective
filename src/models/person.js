import { Question, fromFallback } from "./question";
import { Greeting } from "./greeting";

/**
 * People:
 * 
 * lnd1_c01
 * ...
 * lnd1_c55
 * 
 */

export class Person {

  /**
   * Person Interface
   * @param {id, name, fallback, questions, greetings} init 
   */

  constructor({id, name, fallback, questions, greetings}){
    if (!id || !name || !fallback || !questions.length || !greetings.length) {
      throw new Error('[Person] needs to have all fields defined when instantiated');
    }

    this.id = id;
    this.name = name;
    this.fallback = fallback;
    this.questions = questions && questions.map(q => new Question(q, this.id));
    this.greetings = greetings && greetings.map(q => new Greeting(q, this.id));
  }

  askAboutTopic(topic, triggers){
    const questionsAboutTopic = this.questions.filter(q => q.topic === topic);
    if (! questionsAboutTopic) {
      return fromFallback(topic, this.fallback);
    }

    const enabledQuestions = questionsAboutTopic
      .map(q => new Question(q, this.id))
      .filter(q => q.isEnabled(triggers))
      .sort((a, b) => b.length - a.length);

    if (!enabledQuestions.length) {
      return fromFallback(topic, this.fallback);
    }

    return enabledQuestions[0];
  }

  getGreeting(triggers) {
    const enabledGreetings = this.greetings
      .map(g => new Greeting(g, this.id))
      .filter(g => g.isEnabled(triggers))
      .sort((a, b) => b.length - a.length);

    return enabledGreetings[0];
  }
}