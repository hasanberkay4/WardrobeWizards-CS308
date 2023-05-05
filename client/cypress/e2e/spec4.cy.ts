/* 
Step 4 (Feature 4 - 100 points): Buy the items in the shopping cart:
1. Go to the shopping cart and confirm the added items.
2. The system should ask the user to log in to complete the purchase.
3. Sign up as a new user
4. Login as a user
5. Make and confirm payment.
6. Show that after payment, an invoice is displayed on the screen
7. Show that a PDF copy of the invoice is emailed to the user.
*/

describe('Purchase Items', () => {
    beforeEach(() => {
        cy.visit('/'); // Replace this with the actual path to your products page
    });

    it('should buy items in the shopping cart', () => {
        // Step 1: Go to the shopping cart and confirm the added items
        cy.get('[data-testid="shopping-cart"]').click();
        cy.get('[data-testid="cart-item-B"]').should('exist');
        cy.get('[data-testid="cart-item-C"]').should('exist');

        // Step 2: The system should ask the user to log in to complete the purchase
        cy.get('[data-testid="checkout"]').click();
        cy.get('[data-testid="login-prompt"]').should('exist');

        // Step 3: Sign up as a new user
        cy.get('[data-testid="sign-up"]').click();
        // Fill in the sign-up form and submit
        // ...

        // Step 4: Login as a user
        cy.get('[data-testid="login"]').click();
        // Fill in the login form and submit
        // ...

        // Step 5: Make and confirm payment
        cy.get('[data-testid="payment"]').within(() => {
            // Fill in the payment form and submit
            // ...
            cy.get('[data-testid="confirm-payment"]').click();
        });

        // Step 6: Show that after payment, an invoice is displayed on the screen
        cy.get('[data-testid="invoice"]').should('exist');

        // Step 7: Show that a PDF copy of the invoice is emailed to the user
        // Check if the email has been sent by intercepting the email-sending API call or using a third-party service like Mailosaur
        // ...
    });
});
