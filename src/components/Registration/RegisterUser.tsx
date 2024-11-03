import { useState, useEffect } from 'react';
import { Alert, Button, Form, Input, Select } from 'antd';

import { getReminders, getShows, registerNewUser } from '../../requests';
import { NewUserDetails, Reminder, ShowData } from '../../utils/types';
import './RegisterUser.css';

interface RegisterResult {
    submitted: boolean
    success: boolean
    message: string
};

const RegisterUser = () => {
    const [shows, setShows] = useState<ShowData[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [registerResult, setRegisterResult] = useState<RegisterResult>({
        submitted: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        getShows().then(shows => setShows(shows));
        getReminders().then(reminders => setReminders(reminders));
    }, []);
    
    const registerUser = async (values: NewUserDetails) => {
        if (!values.reminder_subscriptions) {
            values.reminder_subscriptions = [];
        }
        if (!values.show_subscriptions) {
            values.show_subscriptions = [];
        }
        
        const response = await registerNewUser(values);
        if (response.result === 'success') {
            setRegisterResult({
                submitted: true,
                success: true,
                message: response.payload.message
            });
        }
        else {
            setRegisterResult({
                submitted: true,
                success: false,
                message: response?.message
            });
        }
    };
    
    return (
        <>
            <Form
                onFinish={registerUser}
                id="register-user"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    required
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Show Subscriptions"
                    name="show_subscriptions"
                >
                    <Select
                        options={shows ? shows.map(show => ({ label: show.show_name, value: show.show_name })) : []}
                        showSearch
                        notFoundContent='No Shows available'
                        mode="multiple"
                    />
                </Form.Item>
                <Form.Item
                    label="Reminder Subscriptions"
                    name="reminder_subscriptions"
                    >
                    <Select
                        options={reminders ? reminders.map(reminder => ({ label: reminder.show, value: reminder.show })) : []}
                        showSearch
                        notFoundContent='No Reminders available'
                        mode="multiple"
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit">Register</Button>
            </Form>
            {registerResult.submitted && (
                <Alert type={registerResult.success ? "success" : "error"} message={registerResult.message} />
            )}
        </>
    );
};

export default RegisterUser;