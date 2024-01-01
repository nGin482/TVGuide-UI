import { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { Form, Input, Modal, Select } from "antd";

import { UserContext } from '../../contexts/UserContext';
import { addReminder, getRecordedShows } from '../../requests/requests';
import { RecordedShowModel, Reminder } from '../../utils';
import './AddReminder.css';

interface AddReminderProps {
    showAddReminder: boolean
    setShowAddReminder: Dispatch<SetStateAction<boolean>>
};

const AddReminder = ({ showAddReminder, setShowAddReminder }: AddReminderProps) => {
    const [reminderAlert, setReminderAlert] = useState('');
    const [recordedShows, setRecordedShows] = useState<RecordedShowModel[]>([]);
    
    const [form] = Form.useForm();
    const { user } = useContext(UserContext);

    useEffect(() => {
        getRecordedShows().then(recordedShows => setRecordedShows(recordedShows));
    }, []);

    const handleAddReminder = async () => {
        form.validateFields().then(() => {
            const newReminder: Reminder = form.getFieldsValue();
            console.log(newReminder)
        });
        // const response = await addReminder(reminderObject, user.token);
        // const message = response.result === 'success' ? response.message : response.payload.message;
    };

    return (
        <Modal
            open={showAddReminder}
            onOk={handleAddReminder}
            onCancel={() => setShowAddReminder(false)}
            title="Add a new Reminder"
        >
            <Form
                form={form}
                name="add-reminder"
            >
                <Form.Item
                    name="show"
                    label="Set a reminder for:"
                >
                    <Select
                        options={recordedShows.length > 0 ? recordedShows.map(show => ({ label: show.show, value: show.show }) ) : [] }
                        showSearch
                    />
                </Form.Item>
                <Form.Item
                    name="reminder_alert"
                    label="Remind me"
                    initialValue="Before"
                >
                    <Select
                        options={[
                            { label: 'Before the episode starts', value: 'Before' },
                            { label: 'When the episode starts', value: 'During' },
                            { label: 'After the episode starts', value: 'After' }
                        ]}
                        onChange={(value) => setReminderAlert(value)}
                    />
                </Form.Item>
                <Form.Item
                    name="warning_time"
                    label="How much warning time"
                >
                    <Input
                        disabled={reminderAlert === 'During'}
                        addonAfter="minutes"
                    />
                    {reminderAlert === 'During' && 'This does not need to be set if you wish to be reminded when the episode starts.'}
                </Form.Item>
                <Form.Item
                    name="occasions"
                    label="Remind me for"
                    initialValue="All"
                >
                    <Select
                        options={[
                            { label: 'Every episode', value: 'All' },
                            { label: 'Only the latest seasons', value: 'Latest' }
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
};


export default AddReminder;