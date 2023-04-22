const base_url = "http://localhost:3000";

// Test Suite for SignIn
describe('SignIn', () => {
  beforeEach(() => {
    cy.visit(`${base_url}/sign-up`);
  });

  it('displays the login form', () => {
    cy.get('[data-cy=email]').should('be.visible');
    cy.get('[data-cy=password]').should('be.visible');
    cy.get('[data-cy=login-button]').should('be.visible');
  });

  it('requires email and password for login', () => {
    cy.get('[data-cy=login-button]').click();
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('logs in with correct credentials', () => {
    cy.get('[data-cy=email]').type('user@example.com');
    cy.get('[data-cy=password]').type('your-password');
    cy.get('[data-cy=login-button]').click();

    // Verify that the user is redirected to the home page after successful login
    cy.url().should('include', '/home');
  });

  it('displays an error for incorrect credentials', () => {
    cy.get('[data-cy=email]').type('wrong@example.com');
    cy.get('[data-cy=password]').type('wrong-password');
    cy.get('[data-cy=login-button]').click();

    cy.contains('Invalid email or password').should('be.visible');
  });
});


// Test Suite for SignUp
describe('SignUp', () => {
  beforeEach(() => {
    cy.visit(`${base_url}/login`);
  });

  it('displays the registration form', () => {
    cy.get('[data-cy=fullname]').should('be.visible');
    cy.get('[data-cy=email]').should('be.visible');
    cy.get('[data-cy=password]').should('be.visible');
    cy.get('[data-cy=confirm-password]').should('be.visible');
    cy.get('[data-cy=register-button]').should('be.visible');
  });

  it('requires fullname, email, and password for registration', () => {
    cy.get('[data-cy=register-button]').click();
    cy.contains('Full name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('requires matching password and confirm password fields', () => {
    cy.get('[data-cy=fullname]').type('New User');
    cy.get('[data-cy=email]').type('newuser@example.com');
    cy.get('[data-cy=password]').type('your-password');
    cy.get('[data-cy=confirm-password]').type('different-password');
    cy.get('[data-cy=register-button]').click();

    cy.contains('Passwords do not match').should('be.visible');
  });

  it('registers a new user with valid credentials', () => {
    cy.get('[data-cy=fullname]').type('New User');
    cy.get('[data-cy=email]').type('newuser@example.com');
    cy.get('[data-cy=password]').type('your-password');
    cy.get('[data-cy=confirm-password]').type('your-password');
    cy.get('[data-cy=register-button]').click();

    // Verify that the user is redirected to the home page after successful registration
    cy.url().should('include', '/home');
  });

  it('displays an error for an email address that is already registered', () => {
    cy.get('[data-cy=fullname]').type('Existing User');
    cy.get('[data-cy=email]').type('existinguser@example.com');
    cy.get('[data-cy=password]').type('your-password');
    cy.get('[data-cy=confirm-password]').type('your-password');
    cy.get('[data-cy=register-button]').click();

    cy.contains('Email address already in use').should('be.visible');
  });
});
