import React from 'react'
import AuthIcon from './AuthIcon'

describe('<AuthIcon />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AuthIcon />)
  })
})