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
    
    return (
        <div id="reminders-page">
            <h1>Reminders</h1>
            <Reminders reminders={reminders}/>
            <button onClick={() => setShowAddReminder(true)}>Add Reminder</button>
            {showAddReminder ? <AddReminder setShowAddReminder={setShowAddReminder}/> : ''}
        </div>
    )
}


export default RemindersPage;