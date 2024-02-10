import { useState, useEffect, FormEvent } from 'react';
import { Form, Input, Select } from 'antd';

import { getRecordedShows, getReminders, registerNewUser } from '../../requests/requests';
import { RecordedShowModel, Reminder } from '../../utils';
import './RegisterUser.css';

const RegisterUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [recordedShows, setRecordedShows] = useState<RecordedShowModel[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);

    useEffect(() => {
        getRecordedShows().then(recordedShows => setRecordedShows(recordedShows));
        getReminders().then(reminders => setReminders(reminders));
    }, []);
    
    const registerUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = {
            username,
            password,
            show_subscriptions: [],
            reminder_subscriptions: []
        };
        const response = await registerNewUser(user);

        if (response.result === 'success') {
            console.log(response)
            console.log(response.payload.message)
        }
    };
    
    return (
        <div id='register-user'>
            <Form
            
            >
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
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
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterUser;