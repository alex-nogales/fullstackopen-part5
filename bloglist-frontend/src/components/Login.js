import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    handleLogin(username, password)
  }

  return (
    <div>
      <h1> Login to the app </h1>
      <form onSubmit={handleSubmit}>
        <div>
                    username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange = {({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit"> login </button>
      </form>
    </div>
  )
}

export default Login