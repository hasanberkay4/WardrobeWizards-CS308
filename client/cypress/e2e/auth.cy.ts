describe('Open ProductList Page', () => {

  it('finds the landing page', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Shop Collection').click();
  })



})