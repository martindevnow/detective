export const visit = () => cy.visit('/');
export const getStore = () => cy.window().its('app.$store');

