import { useState, useEffect } from 'react';
import requests from './requests/requests';


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
        <h1>Reminders</h1>
    )
}


export default RemindersPage;