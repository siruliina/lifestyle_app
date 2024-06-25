import { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})

    const handleLogin = (event) => {
        event.preventDefault()

        try {
            setUser({
                username: username,
                password: password
            })         
        } catch (e) {
            console.log('Error occurred:', e.message)
        }
        
        console.log(user, 'logged in successfully')
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                        id='username'
                    />
                </div>
                <div>
                    Password
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                        id='password'
                    />
                </div>
            <button type='submit' id='login-button'>Log in</button>
            </form>
        </div>
    )
}

export default Login