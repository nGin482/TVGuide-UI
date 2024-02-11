import { useState, useEffect } from 'react';
import { Alert, Button, Form, Input, Select } from 'antd';

import { getRecordedShows, getReminders, registerNewUser } from '../../requests/requests';
import { RecordedShowModel, Reminder } from '../../utils';
import './RegisterUser.css';

interface RegisterPayload {
    username: string
    password: string
    show_subscriptions: string[]
    reminder_subscriptions: string[]
};

interface RegisterResult {
    submitted: boolean
    success: boolean
    message: string
};

const RegisterUser = () => {
    const [recordedShows, setRecordedShows] = useState<RecordedShowModel[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [registerResult, setRegisterResult] = useState<RegisterResult>({
        submitted: false,
        success: false,
        message: ''
    });

    useEffect(() => {
        getRecordedShows().then(recordedShows => setRecordedShows(recordedShows));
        getReminders().then(reminders => setReminders(reminders));
    }, []);
    
    const registerUser = async (values: RegisterPayload) => {
        if (!values.reminder_subscriptions) {
            values.reminder_subscriptions = [];
        }
        if (!values.show_subscriptions) {
            values.show_subscriptions = [];
        }
        console.log(values)
        
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
        <div id='register-user'>
            <Form
                onFinish={registerUser}
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
                        options={recordedShows ? recordedShows.map(show => ({ label: show.show, value: show.show })) : []}
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
        </div>
    );
};

export default RegisterUser;