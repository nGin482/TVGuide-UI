import { useState, useEffect, useContext } from 'react';
import { Alert, Button, Card, Form, Input, Modal, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import AddReminder from '../Reminders/AddReminder/AddReminder';
import { UserContext } from '../contexts/UserContext';
import { getReminders, deleteReminder } from '../requests/requests';
import { Reminder } from '../utils';
import './RemindersPage.css';


const RemindersPage = () => {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [showAddReminder, setShowAddReminder] = useState(false);
    const [editingReminder, setEditingReminder] = useState(false);
    const [editReminder, setEditReminder] = useState<Reminder>(null);
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
        setEditReminder(reminder);
    };

    const updateReminder = (field: string, value: string) => {
        if (field === 'reminder_alert') {
            setEditReminder(prevState => ({ ...prevState, reminder_alert: value }) )
        }
        else if (field === 'warning_time') {
            setEditReminder(prevState => ({ ...prevState, warning_time: Number(value) }) )
        }
        else {
            setEditReminder(prevState => ({ ...prevState, occasions: value }) )
        }
    };

    const editReminderHandle = async () => {

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
            {editingReminder && editReminder && (
                <Modal
                    open={editingReminder && editReminder != null}
                    onCancel={() => setEditingReminder(false)}
                    onOk={event => console.log(event)}
                    title={`Edit the reminder for ${editReminder.show}`}
                >
                    <Form
                        form={form}
                        name="Edit Reminder"
                    >
                        <Form.Item
                            label="Reminder Alert"
                        >
                            <Select
                                options={[
                                    { label: 'Before the episode starts', value: 'Before' },
                                    { label: 'When the episode starts', value: 'During' },
                                    { label: 'After the episode starts', value: 'After' }
                                ]}
                                defaultValue={editReminder.reminder_alert}
                                onChange={(value) => updateReminder('reminder_alert', value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Warning Time"
                        >
                            <Input
                                value={editReminder.warning_time}
                                disabled={editReminder.reminder_alert === 'During'}
                                addonAfter={editReminder.reminder_alert !== 'During' && `minutes ${editReminder.reminder_alert.toLowerCase()} `}
                                onChange={(event) => updateReminder('warning_time', event.currentTarget.value)}
                            />
                            {editReminder.reminder_alert === 'During' && 'This does not need to be set if you wish to be reminded when the episode starts.'}
                        </Form.Item>
                        <Form.Item
                            label="Occasions"
                        >
                            <Select
                                options={[
                                    { label: 'Every episode', value: 'All' },
                                    { label: 'Only the latest seasons', value: 'Latest' }
                                ]}
                                defaultValue={editReminder.occasions}
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