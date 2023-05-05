import React from 'react'
import ProductView from './ProductView'

describe('<ProductView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProductView />)
  })
})