import { useState, useContext, FormEvent, Dispatch, SetStateAction } from 'react';
import { Form, Input, Modal, Select } from "antd";

import { UserContext } from '../../contexts/UserContext';
import { addReminder } from '../../requests/requests';
import { Reminder } from '../../utils';
import './AddReminder.css';

interface AddReminderProps {
    showAddReminder: boolean
    setShowAddReminder: Dispatch<SetStateAction<boolean>>
};

const AddReminder = ({ showAddReminder, setShowAddReminder }: AddReminderProps) => {
    const [showToRemind, setShowToRemind] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [reminderAlert, setReminderAlert] = useState('');
    const [occasions, setOccasions] = useState('');

    const [displayNote, setDisplayNote] = useState(false);
    const [reminderResponse, setReminderResponse] = useState('');

    const [form] = Form.useForm();
    const { user } = useContext(UserContext);
    
    const handleAddReminder = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const reminderObject: Reminder = {
            show: showToRemind,
            reminder_alert: reminderAlert,
            warning_time: Number(reminderTime),
            occasions: occasions
        };
        console.log(reminderObject)
        const response = await addReminder(reminderObject, user.token);
        const message = response.result === 'success' ? response.message : response.payload.message;
        setReminderResponse(message);
        setShowToRemind('');
        setReminderTime('');
        setReminderAlert('');
        setOccasions('');
    };

    return (
        <Modal
            open={showAddReminder}
            onOk={() => console.log('done')}
            onCancel={() => setShowAddReminder(false)}
            title="Add Reminder"
        >
            <Form
                form={form}
            >
                <Form.Item
                    name="show"
                    label="Set a reminder for:"
                >

                </Form.Item>
                <Form.Item
                    name="warningTime"
                    label="When would you like to be reminded"
                >

                </Form.Item>
                <Form.Item
                    name="occasions"
                    label="The number of occasions to be reminded"
                    initialValue="All"
                >
                </Form.Item>
            </Form>
        </Modal>
    )
};


export default AddReminder;