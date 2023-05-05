import React from 'react'
import Error from './404'

describe('<Error />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Error />)
  })
})