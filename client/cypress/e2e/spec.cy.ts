/* 
Step 1 (Feature 1 and 9): From the main/home page, show the different product categories you have, and the properties a product has (such as ID, name, model, ...).
*/

describe('Feature 1 and 9: Show the different product categories you have, and the properties a product has (such as ID, name, model, ...).', () => {
  it('shows the different product categories', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy=categories]').should('exist');
  });

  it('shows the properties of a product', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy=product]').should('exist');
  });
});