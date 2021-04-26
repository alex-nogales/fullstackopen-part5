import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Renders content', () => {
  const blog = {
    author: 'Author bueno',
    title: 'Title of the test'
  }

  const component =render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Author bueno'
  )
})
