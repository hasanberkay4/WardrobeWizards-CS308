import React from 'react'
import ProfileHome from './profileHome'

describe('<ProfileHome />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProfileHome />)
  })
})