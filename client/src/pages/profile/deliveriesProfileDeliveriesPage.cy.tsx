import React from 'react'
import ProfileDeliveriesPage from './deliveries'

describe('<ProfileDeliveriesPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProfileDeliveriesPage />)
  })
})