import { useState, useEffect } from "react";
import { Button, Typography } from "antd";

import Login from "../components/Login/Login";
import RegisterUser from "../components/Registration/RegisterUser";

const LoginPage = () => {
    const [activity, setActivity] = useState('login');

    const { Text } = Typography;


    return (
        <>
            {activity === 'login' && (
                <>
                    <Login />
                    <br/>
                    Don't have an account? <Button type="primary" onClick={() => setActivity('register')}>Register</Button>
                </>
            )}
            {activity === 'register' && (
                <>
                    <RegisterUser />
                    <br />
                    Already have an account? <Button type="primary" onClick={() => setActivity('login')}>Log in</Button>
                </>
            )}
        </>
    );
};

export default LoginPage;