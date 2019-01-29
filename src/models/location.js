import { Person } from "./person";
import { Item } from "./item";

/**
 * Locations
 * 
 * lnd1_l01 - Police Station
 * lnd1_lA - Westminster
 * lnd1_lB - The City
 * lnd1_lC - Soho & Covent Garden
 * lnd1_lD - Leicester square & Hyde Park
 * lnd1_lE - Camden Town
 * lnd1_lF - Kensington & Chelsea
 * lnd1_lG - Notting Hill
 * lnd1_lH
 * lnd1_lI
 * lnd1_lJ
 * lnd1_lK
 * lnd1_lL - Bloomsbury
 * lnd1_lM
 * 
 */

export class Location {

  constructor({id, name, initDescription, search, people, items}) {
    this.id = id;
    this.name = name;
    this.initDescription = initDescription;
    this.search = search;
    this.people = people && people.map(p => new Person(p));
    this.items = items && items.map(i => new Item(i));
  }

  canSearch(triggers) {
    if (!this.search) {
      return false;
    }
    // User has a Trigger that disables this Search
    if (this.search.disablingTriggers.some(disTrig => triggers.some(userTrig => userTrig === disTrig))) {
      return false;
    }
    // No triggers required for this Search
    if (this.search.enablingTriggers.length === 0) {
      return true;
    }
    // User has every trigger required to Search
    if (this.search.enablingTriggers.every(enabTrig => triggers.some(userTrig => userTrig === enabTrig))) {
      return true;
    }
    // User doesn't have every trigger required
    return false;
  }
}