import { Location } from "./location";

export class Scenario {
  constructor({id, name, introText, initLocation, locations}) {
    this.id = id;
    this.name = name;
    this.introText = introText;
    this.initLocation = initLocation;
    this.locations = locations.map(l => new Location(l));
  }
}