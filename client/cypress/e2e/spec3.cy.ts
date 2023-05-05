/*
Step 3 (Feature 7 - 100 points): Add items to the shopping cart:
1. The user is not logged in to the system.
2. Sort products depending on their price.
3. Sort products depending on their popularity.
4. Search for Product A by name and show that it cannot be added to the shopping cart.
5. Search for Product B by name and add it to the shopping cart.
6. Search for Product C by description and add it to the shopping cart.
*/

describe('Shopping Cart', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/'); // Replace this with the actual path to your products page
    });

    it('should add items to the shopping cart', () => {
        // Step 1: The user is not logged in to the system
        // This can be checked by verifying the absence of an auth token or the presence of a login button
        cy.get('[data-testid="login-button"]').should('exist');

        // Step 2: Sort products depending on their price
        cy.get('[data-testid="sort-price"]').click();

        // Step 3: Sort products depending on their popularity
        cy.get('[data-testid="sort-popularity"]').click();

        // Step 4: Search for Product A by name and show that it cannot be added to the shopping cart
        cy.get('[data-testid="search-input"]').type('Product A');
        cy.get('[data-testid="product-A"]').within(() => {
            cy.get('button.add-to-cart').should('be.disabled');
        });

        // Step 5: Search for Product B by name and add it to the shopping cart
        cy.get('[data-testid="search-input"]').clear().type('Product B');
        cy.get('[data-testid="product-B"]').within(() => {
            cy.get('button.add-to-cart').click();
        });

        // Step 6: Search for Product C by description and add it to the shopping cart
        cy.get('[data-testid="search-input"]').clear().type('Product C description');
        cy.get('[data-testid="product-C"]').within(() => {
            cy.get('button.add-to-cart').click();
        });
    });
});
