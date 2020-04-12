import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store/store'

test.skip('renders sync', () => {
  const { getByText } = render(
    <Provider store={ store }>
    </Provider>
  )
  const linkElement = getByText(/^sync/i)
  expect(linkElement).toBeInTheDocument()
})
