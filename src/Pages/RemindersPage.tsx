import { useState, useEffect } from 'react';

import ReminderCard from '../Reminders/ReminderCard';
import AddReminder from '../Reminders/AddReminder/AddReminder';
import { getReminders } from '../requests/requests';
import { Reminder } from '../utils';
import './RemindersPage.css';


const RemindersPage = () => {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [showAddReminder, setShowAddReminder] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        getReminders().then((data: Reminder[]) => {
            setReminders(data);
        }).catch(err => {
            setError(err.response?.data.message);
        });
    }, []);

    useEffect(() => {
        console.log(reminders)
    }, reminders);

    return (
        <div id="reminders-page">
            <h1>Reminders</h1>
            {showAddReminder
                ? <AddReminder setShowAddReminder={setShowAddReminder}/>
                : <button id="add-reminder-button" onClick={() => setShowAddReminder(true)}>Add Reminder</button>
            }
            <div id="reminders">
                {reminders.length > 0 && !error ? (
                    reminders.map(reminder => <ReminderCard reminder={reminder} />)
                ) : error ? (
                    <h1>{error}</h1>
                ) : (
                    <h1>Waiting for Reminders to be retrieved...</h1>
                )}
            </div>
        </div>
    );
};


export default RemindersPage;