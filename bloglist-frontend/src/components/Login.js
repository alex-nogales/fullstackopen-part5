import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('anogales')
    const [password, setPassword] = useState('password')

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
                        type="text"
                        value={username}
                        name="Username"
                        onChange = {({ target }) => setUsername(target.value)}
                        />
                </div>
                <div>
                    password
                        <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange = {({ target }) => setPassword(target.value)}
                        />
                </div>
                <button type="submit"> login </button>
            </form>
        </div>
    )


}

export default Login