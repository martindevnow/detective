// https://docs.cypress.io/api/introduction/api.html

describe('Select Scenario', () => {
  it('Can select the scenario and it updates properly', () => {
    cy.visit('/');
    cy.contains('a', 'Scenarios').click();
    cy.get('button').should('contain', 'Fear the Living');
  });

  it('Begins the Scenario', () => {
    cy.visit('/');
    cy.contains('a', 'Scenarios').click();
    cy.get('button').click();
    cy.get('button').click()
    cy.contains('.subject', 'You walk into Scotland Yard')
  });
});
