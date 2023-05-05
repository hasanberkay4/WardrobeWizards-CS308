import React from 'react'
import LandingView from './LandingView'

describe('<LandingView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LandingView />)
  })
})