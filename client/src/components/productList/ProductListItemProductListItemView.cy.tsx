import React from 'react'
import { ProductListItemView } from './ProductListItem'

describe('<ProductListItemView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProductListItemView />)
  })
})