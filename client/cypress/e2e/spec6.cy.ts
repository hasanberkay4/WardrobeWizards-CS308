/*
Step 6 (Feature 5 - 100 points): After delivering the products:
1. Give a rating to Product B, which should be immediately added.
2. Write a comment about Product B, which should not appear immediately
3. Write a comment about Product C, which should not appear immediately.
4. Approve the comment on Product C and decline the comment on Product B.
5. Show the comments on both Products B and C from the main/home page.
*/

describe('After Delivery', () => {
    beforeEach(() => {
        cy.visit('/'); // Replace this with the actual path to your products page
    });

    it('should handle post-delivery steps', () => {
        // Step 1: Give a rating to Product B, which should be immediately added
        cy.get('[data-testid="product-B"]').click(); // Replace "product-B" with the actual identifier for Product B
        cy.get('[data-testid="rating-input"]').type("5");
        cy.get('[data-testid="submit-rating"]').click();

        // Step 2: Write a comment about Product B, which should not appear immediately
        cy.get('[data-testid="comment-input"]').type('This is a comment about Product B.');
        cy.get('[data-testid="submit-comment"]').click();
        cy.get('[data-testid="comment"]').should('not.exist');

        // Step 3: Write a comment about Product C, which should not appear immediately
        cy.visit('/'); // Replace this with the actual path to your products page
        cy.get('[data-testid="product-C"]').click(); // Replace "product-C" with the actual identifier for Product C
        cy.get('[data-testid="comment-input"]').type('This is a comment about Product C.');
        cy.get('[data-testid="submit-comment"]').click();
        cy.get('[data-testid="comment"]').should('not.exist');

        // Step 4: Approve the comment on Product C and decline the comment on Product B
        // This step assumes there is an admin interface to manage comments
        cy.visit('/admin'); // Replace this with the actual path to your admin page
        cy.get('[data-testid="approve-comment-product-C"]').click();
        cy.get('[data-testid="decline-comment-product-B"]').click();

        // Step 5: Show the comments on both Products B and C from the main/home page
        cy.visit('/'); // Replace this with the actual path to your products page
        cy.get('[data-testid="product-B"]').click();
        cy.get('[data-testid="comment"]').should('not.exist');

        cy.visit('/'); // Replace this with the actual path to your products page
        cy.get('[data-testid="product-C"]').click();
        cy.get('[data-testid="comment"]').contains('This is a comment about Product C.');
    });
});
