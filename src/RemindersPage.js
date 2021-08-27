import { useState, useEffect } from 'react';
import Reminders from './Reminders';
import requests from './requests/requests';
import AddReminder from './AddReminder';
import './RemindersPage.css';


const RemindersPage = () => {
    const [reminders, setReminders] = useState([])
    const [showAddReminder, setShowAddReminder] = useState(false)
    
    
    useEffect(() => {
        requests.getReminders().then(data => {
            setReminders(data)
        }).catch(errResponse => {
            console.log(errResponse)
        })
    }, []
    )
    console.log(reminders)

    const displayAddReminder = () => {
        if (showAddReminder) {
            return (
                <AddReminder setShowAddReminder={setShowAddReminder}/>
            )
        }
        else {
            return (
                <button id="add-reminder-button" onClick={() => setShowAddReminder(true)}>Add Reminder</button>
            )
        }
    }
    
    return (
        <div id="reminders-page">
            <h1>Reminders</h1>
            {displayAddReminder()}
            <Reminders reminders={reminders}/>
        </div>
    )
}


export default RemindersPage;