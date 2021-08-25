import { useState, useEffect } from 'react';
import requests from './requests/requests';
import Reminders from './Reminders';
import './RemindersPage.css';


const RemindersPage = () => {
    const [reminders, setReminders] = useState([])
    
    
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
        </div>
    )
}


export default RemindersPage;