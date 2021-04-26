import React from 'react'
import Toggable from './Toggable'
import blogService from '../services/blogs'

const handleLikes = ({ id, likes }) => {
  blogService.update(id, {
    'likes': likes
  })
}
const handleDelete = ({ id }) => {
  if (window.confirm('Really wanna delete this!?')) {
    blogService.remove(id)
  }
}

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const displayDelete = () => {
    if (window.localStorage.getItem('loggedBlogUser')) {
      const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
      if (loggedUser.username === blog.user.username) {
        return true
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
      </div>
      <div>
        <Toggable buttonLabel='show' hideButton='hide'>
          {blog.url} <br />
          <span>
            {blog.likes} <button onClick={() => handleLikes({
              likes: blog.likes + 1,
              id: blog.id
            }
            )}>likes </button> <br />
          </span>
          {blog.author} <br />
          {
            displayDelete() ?
              <>
                <button onClick={() => handleDelete({ id: blog.id })}>delete</button>
              </>
              :
              <></>
          }
        </Toggable>
      </div>
    </div>
  )
}

export default Blog