/*
Step 2 (Feature 3 - 50 points): Select three products and present them along with their stock status:
1. Product A: out of stock (thus, “add to shopping cart” button should be disabled)
2. Product B: only one product in stock.
3. Product C: more than one product in stock.
*/

describe('Product Selection', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/'); // Replace this with the actual path to your products page
    });

    it('should display products with their stock status', () => {
        // Product A
        cy.get('[data-testid="product-A"]').within(() => {
            cy.contains('Out of stock');
            cy.get('button.add-to-cart').should('be.disabled');
        });

        // Product B
        cy.get('[data-testid="product-B"]').within(() => {
            cy.contains('Only 1 in stock');
            cy.get('button.add-to-cart').should('not.be.disabled');
        });

        // Product C
        cy.get('[data-testid="product-C"]').within(() => {
            cy.contains('More than 1 in stock');
            cy.get('button.add-to-cart').should('not.be.disabled');
        });
    });
});
