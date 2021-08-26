import { useState } from 'react';
import Modal from 'react-modal';
import './AddReminder.css';

const AddReminder = () => {
    const [showToRemind, setShowToRemind] = useState('')
    const [reminderTime, setReminderTime] = useState('')
    const [beforeAfter, setBeforeAfter] = useState('')
    const [interval, setReminderInterval] = useState('')

    const [displayNote, setDisplayNote] = useState(false)
    
    const handleInputChange = event => {
        if (event.target.name === 'showToRemind') {
            setShowToRemind(event.target.value)
        }
        if (event.target.name === 'reminderTime') {
            setReminderTime(event.target.value)
        }
        if (event.target.name === 'interval') {
            setReminderInterval(event.target.value)
        }
    }

    const addReminder = event => {
        event.preventDefault()
        if (beforeAfter === 'During') {
            setReminderTime('0 mins before')
        }
        else {
            const timeChosen = reminderTime
            setReminderTime(timeChosen + ' mins ' + beforeAfter)
        }
        const reminderObject = {
            show: showToRemind,
            beforeAfter: beforeAfter,
            'reminder time': reminderTime,
            interval: interval
        }
        console.log(reminderObject)
        setShowToRemind('')
        setReminderTime('')
        setBeforeAfter('')
        setReminderInterval('')
    }

    const specifyReminderTime = () => {

        if (beforeAfter !== 'During' && beforeAfter !== '') {
            return (
                <input
                    type="number"
                    id="reminder-time-number"
                    placeholder="Specify a time"
                    min="1"
                    max="59"
                    onChange={event => setReminderTime(event.target.value)}
                    value={reminderTime}    
                />
            )
        }
        else {
            return ''
        }
    }

    Modal.setAppElement('#root')
    return (
        <div id="add-reminder">
            <h4>Add Reminder</h4>
            <form id="add-reminder-form" onSubmit={event => addReminder(event)}>
                <div id="field-inputs">
                    <label>What show would you like to set a reminder for?</label>
                    <input
                        type="text"
                        name="showToRemind"
                        className="add-reminder-input"
                        id="add-reminder-show"
                        onChange={event => handleInputChange(event)}
                        placeholder="Show"
                        value={showToRemind}
                        required={true}
                    />
                    <label>When would you like to be reminded?</label><span id="reminder-time-note" onClick={() => setDisplayNote(true)}> <b>Note</b></span>
                    <div id="reminder-time-options">
                        <input name="reminderTime" className="add-reminder-input" type="button" value="Before" onClick={() => setBeforeAfter('Before')}/>
                        <input type="button" className="add-reminder-input" value="During" onClick={() => setBeforeAfter('During')}/>
                        <input type="button" className="add-reminder-input" value="After" onClick={() => setBeforeAfter('After')}/>
                        <br/>
                    </div>
                    {specifyReminderTime()}
                    <label>How many times would you like to be reminded this show is on?</label>
                    <select
                        name="interval"
                        onChange={event => handleInputChange(event)}
                        className="add-reminder-input"
                        id="add-reminder-interval"
                        value={interval}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="All" onSelect={() => setReminderInterval('All')}>All</option>
                        <option value="Latest" onSelect={() => setReminderInterval('Latest')}>Latest</option>
                        <option value="Once" onSelect={() => setReminderInterval('Once')}>Once</option>
                    </select>
                </div>
                {showToRemind !== '' ? 
                    <input type="submit" id="submit-reminder" value={"Add Reminder for "+ showToRemind}/>
                    :
                    <input type="submit" id="submit-reminder" value="Add Reminder"/>
                }
            </form>
            <Modal isOpen={displayNote}>
                <button onClick={() => setDisplayNote(false)}>Close</button>
                <blockquote id="reminder-time-note">
                    You do not have to specify when you would like to be reminded.
                    <br/><br/>
                    If left blank, the default is that you will be reminded three minutes before an episode starts.
                </blockquote>
            </Modal>
        </div>
    )
}


export default AddReminder;