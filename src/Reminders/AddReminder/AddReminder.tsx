import { useState, useEffect, useContext, Dispatch, SetStateAction, FormEvent } from 'react';
import { Alert, Form, Input, Modal, Select } from "antd";

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
    const [createReminderStatus, setCreateReminderStatus] = useState(false);
    const [result, setResult] = useState('');
    
    const [form] = Form.useForm();
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getRecordedShows().then(recordedShows => setRecordedShows(recordedShows));
    }, []);

    const handleAddReminder = async () => {
        form.validateFields().then(async () => {
            const newReminder: Reminder = form.getFieldsValue();
            console.log(newReminder)
            const response = await addReminder(newReminder, currentUser.token);
            if (response.payload.result === 'success') {
                setCreateReminderStatus(true);
                setResult(response.payload.message);
            }
            else {
                setCreateReminderStatus(false);
                if (response.payload?.msg === 'Token has expired') {
                    setResult('You have been signed out. Please sign in again to create a new reminder');
                }
                else {
                    setResult(response.payload.message || response.payload.msg);
                }
            }
        })
        .catch(errors => {
            console.log(errors)
        });
    };

    const convertWarningTimeToNumber = (event: FormEvent<HTMLInputElement>) => {
        let warningTimeString = event.currentTarget.value;
        const lastCharIndex = warningTimeString.length - 1;
        if (warningTimeString.charCodeAt(lastCharIndex) < 48 || warningTimeString.charCodeAt(lastCharIndex) > 58) {
            warningTimeString = warningTimeString.replace(warningTimeString.slice(-1), '');
        }
        if (warningTimeString === '') {
            return '';
        }
        return Number(warningTimeString);
    };

    return (
        <Modal
            open={showAddReminder}
            onOk={() => createReminderStatus ? setShowAddReminder(false) : handleAddReminder()}
            onCancel={() => setShowAddReminder(false)}
            okText={createReminderStatus ? 'Close' : 'Submit'}
            title="Add a new Reminder"
        >
            <Form
                form={form}
                name="add-reminder"
            >
                <Form.Item
                    name="show"
                    label="Set a reminder for:"
                    rules={[{ required: true, message: 'Please select the show to create a reminder for' }]}
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
                    rules={[
                        {
                            required: true,
                            min: 0,
                            max: 60,
                            type: 'number',
                            message: 'Please enter a value between 0 and 60'
                        }
                    ]}
                    getValueFromEvent={convertWarningTimeToNumber}
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
                {result && <Alert type={createReminderStatus ? "success" : "error"} message={result} />}
            </Form>
        </Modal>
    )
};


export default AddReminder;