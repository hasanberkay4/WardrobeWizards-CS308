import React from 'react'
import CategoryPreview from './CategoryPreview'

describe('<CategoryPreview />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CategoryPreview />)
  })
})