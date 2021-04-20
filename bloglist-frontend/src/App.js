import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    user !== null && getBlogs()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 2000)
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

  const addBlog = async (blogObject) => {
    const blog = await blogService.create(blogObject)
    setBlogs([...blogs, blog])
    notifyWith('Blog created correctly')
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div>
      <Notification notification={notification} setNotificiation={setNotification}/>
      { user === null 
      ? <Login handleLogin={ handleLogin } /> : 
      <div>
        <p>{ user.name } logged-in <button onClick={handleLogOut}>logout</button></p>
        <h2>blogs</h2>
        <CreateBlog addBlog={addBlog} /> 
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
      </div> 
      }
    </div>
  )
}

export default App