import React from 'react'
import ProfileDeliveries from './profileDeliveries'

describe('<ProfileDeliveries />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProfileDeliveries />)
  })
})