import { useState } from 'react'

const allInterests = [
    'Reading',
    'Traveling',
    'Cooking',
    'Sports',
    'Music',
    'Gaming',
    'Art',
    'Photography',
    'Knitting',
    'Crochet',
    'Baking'
]

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [interests, setInterests] = useState([])
    const [user, setUser] = useState({})

    const handleCheckboxChange = (interest) => {
        setInterests((prevSelectedInterests) => {
            if (prevSelectedInterests.includes(interest)) {
                return prevSelectedInterests.filter((item) => item !== interest);
            } else {
                return [...prevSelectedInterests, interest];
            }
        })
        console.log(interests)
    }
    
    const handleSignUp = (event) => {
        event.preventDefault()
        
        try {
            setUser({
                username: username,
                email: email,
                password: password,
                interests: interests
            })
        } catch (e) {
            console.log('Error occurred:', e.message)
        }

        console.log(user, 'created successfully')
    }

    return (
        <div>
            <h2>Create a new account</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    Username
                    <br/>
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={event => setUsername(event.target.value)}
                        id='username'
                    />
                </div>
                <div>
                    Email
                    <br/>
                    <input
                        type='email'
                        value={email}
                        name='Email'
                        onChange={event => setEmail(event.target.value)}
                        id='email'
                    />
                </div>
                <div>
                    Password
                    <br/>
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        onChange={event => setPassword(event.target.value)}
                        id='password'
                    />
                </div>
                <div>
                    Interests
                    <br/>
                    {allInterests.map((interest) => (
                        <div key={interest}>
                            <label>
                            <input
                                type="checkbox"
                                value={interest}
                                checked={interests.includes(interest)}
                                onChange={() => handleCheckboxChange(interest)}
                            />
                            {interest}
                            </label>
                        </div>
                    ))}
                </div>
            <button type='submit' id='signup-button'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp