import { useState, useEffect } from 'react';
import Reminders from '../Reminders/Reminders';
import AddReminder from '../Reminders/AddReminder/AddReminder';
import requests from '../requests/requests';
import './RemindersPage.css';


const RemindersPage = () => {
    const [reminders, setReminders] = useState([])
    const [showAddReminder, setShowAddReminder] = useState(false)
    const [message, setMessage] = useState('')
    
    
    useEffect(() => {
        requests.getReminders().then(data => {
            setReminders(data)
        }).catch(err => {
            setMessage(err.response.data.message)
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

    if (reminders.length === 0 && message === '') {
        return (
            <div id="reminders-page">
                <h1>Reminders</h1>
                <Reminders message="Waiting for Reminders to be retrieved ..."/>
            </div>
        )
    }
    else if (message !== '') {
        return (
            <div id="reminders-page">
                <h1>Reminders</h1>
                <Reminders message={message}/>
            </div>
        )
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