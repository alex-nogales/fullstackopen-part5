import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    (async function getAll() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])


  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(blogObject)

    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    notifyWith('Blog created correctly')
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      notifyWith(`Successfully logged in as ${user.username}`)
    } catch (e) {
      notifyWith('Incorrect user or password', 'error')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleLikes = async ({ id, likes }) => {
    const updatedBlog = await blogService.update(id, { 'likes': likes })

    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    notifyWith('Correctly liked')
  }

  const deleteBlog = async id => {
    const blogToDelete = blogs.filter(blog => blog.id === id )
    if (window.confirm(`remove blog ${blogToDelete[0].title} by ${blogToDelete[0].author}`)) {
      await blogService.remove(id)
    }

    setBlogs(blogs.filter(blog => blog.id !== id ))
    notifyWith('Blog deleted correctly')
  }

  return (
    <div>
      { !user ?
        <>
          <h2> Login to the app </h2>
          <Notification notification={notification} setNotificiation={setNotification}/>
          <Login handleLogin={handleLogin} />
        </>
        :
        <div>
          <h1>Blogs</h1>
          <Notification notification={notification} setNotificiation={setNotification}/>
          <span className="user">
            {user.name} is logged in <button onClick={handleLogOut}> logout </button>
          </span>
          <h2>Create new </h2>
          <Toggable buttonLabel="New Blog" hideButton="cancel" ref={blogFormRef} >
            <CreateBlog addBlog={addBlog}/>
          </Toggable>
          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} user={user} handleLikes={handleLikes} deleteBlog={deleteBlog} />
              )}
          </div>
        </div>

      }
      <p>Blog app, Department of Computer Science, University of Helsinki 2021</p>
    </div>
  )
}

export default App