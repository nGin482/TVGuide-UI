import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import type { FormRule } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import "./login.css";

interface LoginForm {
    username?: string
    password?: string
};

const rules: FormRule[] = [
    {
        required: true
    }
];

const Login = () => {
    const [ form ] = Form.useForm();

    const loginHandle = async (values: LoginForm) => {
        console.log(values)
    };

    const loginFailed = async (values: ValidateErrorEntity) => {
        values.errorFields.forEach(field => field.errors.forEach(error => console.log(error)))
    };


    return (
        <>
            <Form form={form} onFinish={loginHandle} id="login-form" onFinishFailed={loginFailed}>
                <Form.Item<LoginForm> label="Username" name="username" rules={rules}>
                    <Input />
                </Form.Item>

                <Form.Item<LoginForm> label="Password" name="password" rules={rules}>
                    <Input.Password />
                </Form.Item>
                {/* pw = Optimus, I tried */}
                
                <Form.Item>
                    <Button htmlType="submit" type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;