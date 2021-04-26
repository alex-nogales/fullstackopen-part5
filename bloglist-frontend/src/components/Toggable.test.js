import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Toggable from './Toggable'

describe('<Toggable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Toggable buttonLabel="show..." hideButton='hide...'>
        <div className="testDiv" />
      </Toggable>
    )
  })

  test('render its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.toggableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.toggableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const closeButton = component.getByText('hide...')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.toggableContent')
    expect(div).toHaveStyle('display: none')
  })
})
