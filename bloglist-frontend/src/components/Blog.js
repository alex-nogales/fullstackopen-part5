import React from 'react'
import Toggable from './Toggable'

const Blog = ({ blog, user, handleLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const displayDelete = () => {
    if (window.localStorage.getItem('loggedBlogUser')) {
      if (blog.user !== undefined ) {
        const username = blog.user.username
        if (user.username === username) {
          return true
        }
      } else {
        return false
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
            })}>likes </button> <br />
          </span>
          {blog.author} <br />
          {
            displayDelete() ?
              <>
                <p>added by {blog.user.username} </p>
                <button onClick={() => deleteBlog(blog.id)}>delete</button>
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