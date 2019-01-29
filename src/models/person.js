import { Question, fromFallback } from "./question";

/**
 * Characters:
 * 
 * lnd1_c01
 * ...
 * lnd1_c55
 * 
 */

export class Person {

  /**
   * Person Interface
   * @param {id, name, fallback, questions} init 
   */

  constructor({id, name, fallback, questions}){
    this.id = id;
    this.name = name;
    this.fallback = fallback;
    this.questions = questions && questions.map(q => new Question(q, this.id));
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

    return enabledQuestions[0].response;
  }
}