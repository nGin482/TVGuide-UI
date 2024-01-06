import React, { useState, FormEvent } from 'react';

import { registerNewUser } from '../../requests/requests';
import './RegisterUser.css';

const RegisterUser = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const registerUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            username,
            password,
            show_subscriptions: [],
            reminder_subscriptions: []
        };
        console.log(user)
        const response = await registerNewUser(user);

        if (response.result === 'success') {
            console.log(response.payload.message)
        }
        setUsername('');
        setPassword('');
    };
    
    return (
        <div id='register-user'>
            <form id='register-form' onSubmit={registerUser}>
                <label htmlFor="username" id="username-label" className="register-label">Username</label>
                <input
                    type="text"
                    id="register-username" className="register-input" name="username"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <label htmlFor="password" id="password-label" className="register-label">Password</label>
                <input
                    type="password"
                    id="register-password" className="register-input" name="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <input type="submit" value="Register" id="submit-new-user"/>
            </form>
        </div>
    );
};

export default RegisterUser;