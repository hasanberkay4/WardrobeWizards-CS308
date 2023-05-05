import React from 'react'
import { StoreProvider } from './Store'

describe('<StoreProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<StoreProvider />)
  })
})