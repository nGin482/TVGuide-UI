import { useState, useEffect, useContext } from 'react';
import { Alert, Button, Card, Form, Input, Modal, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import AddReminder from '../Reminders/AddReminder/AddReminder';
import { UserContext } from '../contexts/UserContext';
import { getReminders, deleteReminder, editReminder } from '../requests/requests';
import { Reminder } from '../utils';
import './RemindersPage.css';


const RemindersPage = () => {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [showAddReminder, setShowAddReminder] = useState(false);
    const [editingReminder, setEditingReminder] = useState(false);
    const [reminderChosen, setReminderChosen] = useState<Reminder>(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const [form] = Form.useForm();
    const { user } = useContext(UserContext);
    
    useEffect(() => {
        getReminders().then(data => {
            setReminders(data);
        }).catch(err => {
            setError(err.response?.data.message);
        });
    }, []);

    const toggleEditReminderModal = (reminder: Reminder) => {
        setEditingReminder(true);
        setReminderChosen(reminder);
    };

    const updateReminder = (field: string, value: string) => {
        if (field === 'reminder_alert') {
            setReminderChosen(prevState => ({ ...prevState, reminder_alert: value }) )
        }
        else if (field === 'warning_time') {
            setReminderChosen(prevState => ({ ...prevState, warning_time: Number(value) }) )
        }
        else {
            setReminderChosen(prevState => ({ ...prevState, occasions: value }) )
        }
    };

    const editReminderHandle = () => {
        form.validateFields().then(async () => {
            const response = await editReminder(reminderChosen, user.token);
            console.log(response)
        });
    };

    const deleteReminderHandle = async (reminder: string) => {
        const response = await deleteReminder(reminder, user.token);
        setShowModal(true);
        if (response.result === 'error') {
            setError(response.payload?.message || response.payload?.msg);
        }
    };

    return (
        <div id="reminders-page">
            <h1>Reminders</h1>
            {reminders.length > 0 && showAddReminder
                ? <AddReminder setShowAddReminder={setShowAddReminder}/>
                : <Button id="add-reminder-button" onClick={() => setShowAddReminder(true)}>Add Reminder</Button>
            }
            <div id="reminders">
                {reminders.length > 0 && (
                    reminders.map(reminder =>
                        <>
                            <Card
                                key={`reminder-${reminder.show}`}
                                title={reminder.show}
                                className="reminder-card"
                                actions={user ? [
                                    <EditOutlined onClick={() => toggleEditReminderModal(reminder)} />,
                                    <DeleteOutlined onClick={() => deleteReminderHandle(reminder.show)} />
                                ] : []}
                            >
                                <blockquote>Reminder time: {reminder.reminder_alert}</blockquote>
                                <blockquote>Warning time: {reminder.warning_time}</blockquote>
                                <blockquote>Occasions: {reminder.occasions}</blockquote>
                            </Card>
                        </>
                    )
                )}
            </div>
            {reminders.length === 0 && !error && (
                <Alert type="info" message="Waiting for reminders to be retrieved ..." className="reminders-loading" />
            )}
            <Modal
                open={showModal}
                onOk={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                closable={false}
            >
                {error && <Alert type="error" message={error} />}
            </Modal>
            {editingReminder && reminderChosen && (
                <Modal
                    open={editingReminder && reminderChosen != null}
                    onCancel={() => setEditingReminder(false)}
                    onOk={editReminderHandle}
                    title={`Edit the reminder for ${reminderChosen.show}`}
                >
                    <Form
                        form={form}
                        name="Edit Reminder"
                    >
                        <Form.Item
                            label="Reminder Alert"
                            name="reminder_alert"
                        >
                            <Select
                                options={[
                                    { label: 'Before the episode starts', value: 'Before' },
                                    { label: 'When the episode starts', value: 'During' },
                                    { label: 'After the episode starts', value: 'After' }
                                ]}
                                defaultValue={reminderChosen.reminder_alert}
                                onChange={(value) => updateReminder('reminder_alert', value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Warning Time"
                            name="warning_time"
                        >
                            <Input
                                value={reminderChosen.reminder_alert === 'During' ? 0 : reminderChosen.warning_time}
                                disabled={reminderChosen.reminder_alert === 'During'}
                                addonAfter={reminderChosen.reminder_alert !== 'During' && `minutes ${reminderChosen.reminder_alert.toLowerCase()} `}
                                onChange={(event) => updateReminder('warning_time', event.currentTarget.value)}
                            />
                            {reminderChosen.reminder_alert === 'During' && 'This does not need to be set if you wish to be reminded when the episode starts.'}
                        </Form.Item>
                        <Form.Item
                            label="Occasions"
                            name="occasions"
                        >
                            <Select
                                options={[
                                    { label: 'Every episode', value: 'All' },
                                    { label: 'Only the latest seasons', value: 'Latest' }
                                ]}
                                defaultValue={reminderChosen.occasions}
                                onChange={(value) => updateReminder('occasions', value)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};


export default RemindersPage;