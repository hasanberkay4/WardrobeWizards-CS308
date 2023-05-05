import React from 'react'
import Signin from './Signin'

describe('<Signin />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Signin />)
  })
})

describe('Signin Component', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');
  });

  it('should display an email input', () => {
    cy.get('input[name="email"]').should('exist');
  });

  it('should display a password input', () => {
    cy.get('input[name="password"]').should('exist');
  });

  it('should display a remember me checkbox', () => {
    cy.get('input[name="remember-me"]').should('exist');
  });

  it('should display a sign in button', () => {
    cy.get('button[type="submit"]').should('exist');
  });

  it('should display a sign up link', () => {
    cy.get('a[href="/auth/sign-up"]').should('exist');
  });

  it('should submit the form and show a success message', () => {
    cy.intercept('POST', 'http://localhost:5001/auth/signIn', {
      statusCode: 200,
      body: {
        message: 'Sign in successful',
        token: 'dummy-token',
      },
    });

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Test1234');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.equal('Sign in successful');
    });
  });
});
