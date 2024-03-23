import { useState, useContext, FormEvent, SetStateAction, Dispatch } from "react";
import { Alert, Form, Input, Modal, Select } from "antd";

import { editReminder } from "../requests/requests";
import { UserContext } from "../contexts/UserContext";
import { Reminder } from "../utils";

interface EditReminderProps {
    reminderChosen: Reminder
    setReminderChosen: Dispatch<SetStateAction<Reminder>>
    editingReminder: boolean
    setEditingReminder: Dispatch<SetStateAction<boolean>>
};

const EditReminder = ({ reminderChosen, setReminderChosen, editingReminder, setEditingReminder }: EditReminderProps) => {
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState('');
    const [editSuccess, setEditSuccess] = useState(false);

    const [form] = Form.useForm();
    const { currentUser } = useContext(UserContext);


    const editReminderHandle = () => {
        setSubmitted(true);
        form.validateFields().then(async () => {
            const response = await editReminder(reminderChosen, currentUser.token);
            console.log(response)
            if (response.result === 'success') {
                setResult(`The reminder for ${reminderChosen.show} has been updated!`);
                setEditSuccess(true);
            }
            else {
                if (response?.msg === 'Token has expired') {
                    setResult('You have been signed out. Please sign in again to edit this reminder');
                }
                else {
                    setResult(response.message || response.msg);
                }
                setSubmitted(false);
            }
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

    const updateReminder = (field: string, value: string) => {
        if (field === 'warning_time') {
            setReminderChosen(prevState => ({ ...prevState, warning_time: Number(value) }));
        }
    };
    
    const updateAlert = (value: 'Before' | 'During' | 'After') => {
        setReminderChosen(prevState => ({ ...prevState, reminder_alert: value }));
    };

    const updateOccasion = (value: 'All' | 'Latest') => {
        setReminderChosen(prevState => ({ ...prevState, occasions: value }));
    };

    return (
        <Modal
            open={editingReminder}
            onCancel={() => setEditingReminder(false)}
            onOk={() => submitted ? setEditingReminder(false) : editReminderHandle()}
            okText={submitted ? 'Close' : 'Submit'}
            title={`Edit the reminder for ${reminderChosen.show}`}
        >
            <Form
                form={form}
                name="Edit Reminder"
            >
                <Form.Item
                    label="Reminder Alert"
                    name="reminder_alert"
                    initialValue={reminderChosen.reminder_alert}
                >
                    <Select
                        options={[
                            { label: 'Before the episode starts', value: 'Before' },
                            { label: 'When the episode starts', value: 'During' },
                            { label: 'After the episode starts', value: 'After' }
                        ]}
                        onChange={(value) => updateReminder('reminder_alert', value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Warning Time"
                    name="warning_time"
                    rules={[
                        {
                            type: "number",
                            min: 0,
                            max: 60,
                            message: 'Please enter a value between 0 and 60'
                        }
                    ]}
                    initialValue={reminderChosen.warning_time}
                    getValueFromEvent={convertWarningTimeToNumber}
                >
                    <Input
                        disabled={reminderChosen.reminder_alert === 'During'}
                        addonAfter={reminderChosen.reminder_alert !== 'During' && `minutes ${reminderChosen.reminder_alert.toLowerCase()} `}
                        onChange={(event) => updateReminder('warning_time', event.currentTarget.value)}
                    />
                    {reminderChosen.reminder_alert === 'During' && 'This does not need to be set if you wish to be reminded when the episode starts.'}
                </Form.Item>
                <Form.Item
                    label="Occasions"
                    name="occasions"
                    initialValue={reminderChosen.occasions}
                >
                    <Select
                        options={[
                            { label: 'Every episode', value: 'All' },
                            { label: 'Only the latest seasons', value: 'Latest' }
                        ]}
                        onChange={(value) => updateOccasion(value)}
                    />
                </Form.Item>
                {result && <Alert type={editSuccess ? "success" : "error"} message={result} />}
            </Form>
        </Modal>
    );
};

export default EditReminder;