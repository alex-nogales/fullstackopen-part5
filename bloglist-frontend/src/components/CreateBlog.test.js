import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'

test('<CreateBlog /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()

  const component = render(
    <CreateBlog addBlog={addBlog} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'Testing of forms could be easier right?!' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Testing of forms could be easier right?!')
})