import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Form, Input } from "antd";
import type { FormRule } from "antd";
import Cookies from "universal-cookie";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { UserContext } from "../../contexts/UserContext";
import { login } from "../../requests/requests";

import "./login.css";

interface LoginForm {
    username: string
    password: string
};

const rules: FormRule[] = [
    {
        required: true
    }
];

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const { setUser } = useContext(UserContext);
    const [ form ] = Form.useForm();
    const history = useHistory<string>();

    const cookies = new Cookies(null, { path: '/' });

    const loginHandle = async (values: LoginForm) => {
        console.log(values)
        const response = await login(values);
        if (response.payload.result === 'success') {
            delete response.payload.result;
            cookies.set('user', JSON.stringify(response.payload));
            setUser(response.payload);
            history.push(`/profile/${values.username}`);
        }
        else {
            setLoginError(response.payload.message);
        }
    };

    const loginFailed = async (values: ValidateErrorEntity) => {
        values.errorFields.forEach(field => field.errors.forEach(error => console.log(error)))
        console.log(values)
        setLoginError('Please enter values for all fields');
    };

    return (
        <>
            <Form form={form} onFinish={loginHandle} id="login-form" onFinishFailed={loginFailed} className="auth-form">
                <Form.Item<LoginForm> label="Username" name="username" rules={rules}>
                    <Input />
                </Form.Item>

                <Form.Item<LoginForm> label="Password" name="password" rules={rules}>
                    <Input.Password />
                </Form.Item>
                
                <Form.Item>
                    <Button htmlType="submit" type="primary">Submit</Button>
                </Form.Item>
                {loginError && <Alert type="error" message="Login Failed!" description={loginError} />}
            </Form>
        </>
    );
};

export default Login;