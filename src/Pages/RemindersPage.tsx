import { useState, useEffect, useContext } from 'react';
import { Alert, Button, Card, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import AddReminder from '../Reminders/AddReminder/AddReminder';
import EditReminder from '../Reminders/EditReminder';
import { UserContext } from '../contexts/UserContext';
import { getReminders, deleteReminder } from '../requests/requests';
import { Reminder } from '../utils';
import './RemindersPage.css';


const RemindersPage = () => {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [showAddReminder, setShowAddReminder] = useState(false);
    const [editingReminder, setEditingReminder] = useState(false);
    const [reminderChosen, setReminderChosen] = useState<Reminder>(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

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
                ? <AddReminder showAddReminder setShowAddReminder={setShowAddReminder}/>
                : <Button id="add-reminder-button" onClick={() => setShowAddReminder(true)}>Add Reminder</Button>
            }
            <div id="reminders">
                {reminders.length > 0 && (
                    reminders.map(reminder =>
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
            {reminderChosen && (
                <EditReminder
                    reminderChosen={reminderChosen}
                    setReminderChosen={setReminderChosen}
                    editingReminder={editingReminder}
                    setEditingReminder={setEditingReminder}
                />
            )}
        </div>
    );
};


export default RemindersPage;