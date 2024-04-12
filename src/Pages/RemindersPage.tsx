import { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Alert, Button, Card, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { AddReminder, EditReminder } from '../components/Reminders';
import { RemindersContext, UserContext } from '../contexts';
import { deleteReminder } from '../requests';
import { Reminder } from '../utils/types';
import './styles/RemindersPage.css';


const RemindersPage = () => {
    const [showAddReminder, setShowAddReminder] = useState(false);
    const [editingReminder, setEditingReminder] = useState(false);
    const [reminderChosen, setReminderChosen] = useState<Reminder>(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const { reminders } = useContext(RemindersContext);
    const { currentUser } = useContext(UserContext);

    const toggleEditReminderModal = (reminder: Reminder) => {
        setEditingReminder(true);
        setReminderChosen(reminder);
    };

    const deleteReminderHandle = async (reminder: string) => {
        const response = await deleteReminder(reminder, currentUser.token);
        setShowModal(true);
        if (response.result === 'error') {
            setError(response.message || response.msg);
        }
    };

    return (
        <div id="reminders-page">
            <Helmet>
                <title>Reminders | TVGuide</title>
            </Helmet>
            <h1>Reminders</h1>
            {showAddReminder
                ? <AddReminder showAddReminder setShowAddReminder={setShowAddReminder}/>
                : (
                    <Button
                        id="add-reminder-button"
                        data-testid="add-reminder-button"
                        onClick={() => setShowAddReminder(true)}
                    >
                        Add Reminder
                    </Button>
                )
            }
            <div id="reminders">
                {reminders.length > 0 && (
                    reminders.map(reminder =>
                        <Card
                            key={`reminder-${reminder.show}`}
                            title={reminder.show}
                            className="reminder-card"
                            actions={currentUser ? [
                                <EditOutlined
                                    id={`edit-${reminder.show}`}
                                    data-testid={`edit-${reminder.show}`}
                                    onClick={() => toggleEditReminderModal(reminder)}
                                />,
                                <DeleteOutlined
                                    id={`delete-${reminder.show}`}
                                    data-testid={`delete-${reminder.show}`}
                                    onClick={() => deleteReminderHandle(reminder.show)}
                                />
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