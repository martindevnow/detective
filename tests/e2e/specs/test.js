// https://docs.cypress.io/api/introduction/api.html
import { visit, getStore } from '../utils';

describe('Select Scenario', () => {
  it('Can select the scenario and it updates properly', () => {
    cy.visit('/');
    cy.contains('a', 'Scenarios').click();
    cy.get('button').should('contain', 'Fear the Living');
  });

  it('Begins the Scenario', () => {
    visit();
    cy.contains('a', 'Scenarios').click();
    cy.get('button').click(); // 'Fear the Living' button

    cy.get('button').click(); // 'Begin' button
    cy.contains('.subject', 'You walk into Scotland Yard');
    getStore().its('state.current.scenario.name').should('equal', 'Fear the Living');
    getStore().its('state.current.interactions').should('deep.equal', ['MOVEMENT']);
    getStore().its('state.current.interactionContent.length').should('equal', 1);

    cy.get('button').click(); // 'Continue 'Button
    getStore().its('state.current.interactions').should('deep.equal', []);
    getStore().its('state.current.interactionContent.length').should('equal', 0);

    cy.get('input').type('c01').trigger('change');
    cy.get('button').click(); // 'Scan' button

       // Greeting Page
    cy.contains('.subject', 'Currently speaking to Captain Murphy');

    getStore().its('state.current.interactions').should('deep.equal', ['PERSON']);
    getStore().its('state.current.interactionContent.length').should('equal', 2);
    getStore().its('state.current.interactionContentIndex').should('equal', 0);

    cy.get('button').click(); // 'Continue (1/2)' button
    getStore().its('state.current.interactionContentIndex').should('equal', 1);
    cy.get('button').click(); // 'Continue (2/2)' button
    
    // Idle Page
    cy.get('h1').contains('Talking to Captain Murphy');
  });
});
