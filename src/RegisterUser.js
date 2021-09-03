import { useState } from 'react';
import requests from "./requests/requests";
import './RegisterUser.css';

const RegisterUser = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const registerUser = event => {
        event.preventDefault()
        const user = {
            'username': username,
            'password': password
        }
        console.log(user)
        requests.registerNewUser(user).then(data => {
            setUsername('')
            setPassword('')
            console.log(data)
        })
    }
    
    return (
        <div id='register-user'>
            <form id='register-form' onSubmit={event => registerUser(event)}>
                <label for="username" id="username-label" className="register-label">Username</label>
                <input
                    type="text"
                    id="register-username" className="register-input" name="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <label for="password" id="password-label" className="register-label">Password</label>
                <input
                    type="password"
                    id="register-username" className="register-input" name="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <input type="submit" value="Register" id="submit-new-user"/>
            </form>
        </div>
    )
}

export default RegisterUser;