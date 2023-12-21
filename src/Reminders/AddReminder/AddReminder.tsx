import { useState, useContext, FormEvent, Dispatch, SetStateAction } from 'react';
// import Modal from 'react-modal';

import { UserContext } from '../../contexts/UserContext';
import { addReminder } from '../../requests/requests';
import { Reminder } from '../../utils';
import './AddReminder.css';

const AddReminder = ({ setShowAddReminder }: { setShowAddReminder: Dispatch<SetStateAction<boolean>> }) => {
    const [showToRemind, setShowToRemind] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [reminderAlert, setReminderAlert] = useState('');
    const [occasions, setOccasions] = useState('');

    const [displayNote, setDisplayNote] = useState(false);
    const [reminderResponse, setReminderResponse] = useState('');

    const { user } = useContext(UserContext);
    
    const handleAddReminder = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const reminderObject: Reminder = {
            show: showToRemind,
            reminder_alert: reminderAlert,
            warning_time: Number(reminderTime),
            occasions: occasions
        };
        console.log(reminderObject)
        const response = await addReminder(reminderObject, user.token);
        const message = response.result === 'success' ? response.message : response.payload.message;
        setReminderResponse(message);
        setShowToRemind('');
        setReminderTime('');
        setReminderAlert('');
        setOccasions('');
    };

    // Modal.setAppElement('#root')
    return (
        <div id="add-reminder">
            <h4>Add Reminder</h4>
            <form id="add-reminder-form" onSubmit={event => handleAddReminder(event)}>
                <div id="field-inputs">
                    <label>What show would you like to set a reminder for?</label>
                    <input
                        type="text"
                        name="showToRemind"
                        className="add-reminder-input"
                        id="add-reminder-show"
                        onChange={event => setShowToRemind(event.target.value)}
                        placeholder="Show"
                        value={showToRemind}
                        required={true}
                    />
                    <label>When would you like to be reminded?</label>
                    <span id="reminder-time-note" onClick={() => setDisplayNote(true)}> <b>Note</b></span>
                    <div id="reminder-time-options">
                        <input type="button" className="add-reminder-input" value="Before" onClick={() => setReminderAlert('Before')} name="reminderTime"/>
                        <input type="button" className="add-reminder-input" value="During" onClick={() => setReminderAlert('During')}/>
                        <input type="button" className="add-reminder-input" value="After" onClick={() => setReminderAlert('After')}/>
                        <br/>
                    </div>
                    {reminderAlert && reminderAlert !== 'During' && (
                        <input
                            type="number"
                            id="reminder-time-number"
                            placeholder="Specify a time"
                            min="1"
                            max="59"
                            onChange={event => setReminderTime(event.target.value)}
                            value={reminderTime}    
                        />
                    )}
                    <label>How many times would you like to be reminded this show is on?</label>
                    <select
                        name="interval"
                        onChange={event => setInterval(event.target.value)}
                        className="add-reminder-input"
                        id="add-reminder-interval"
                        value={occasions}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="All" onSelect={() => setOccasions('All')}>All</option>
                        <option value="Latest" onSelect={() => setOccasions('Latest')}>Latest</option>
                        <option value="Once" onSelect={() => setOccasions('Once')}>Once</option>
                    </select>
                </div>
                <input type="submit" id="submit-reminder" value={showToRemind ? `Add Reminder for ${showToRemind}` : 'Add Reminder'} />
            </form>
            {/* <Modal isOpen={displayNote} id="reminder-note-modal">
                <blockquote id="reminder-time-note">
                    You do not have to specify when you would like to be reminded.
                    <br/><br/>
                    If left blank, the default is that you will be reminded three minutes before an episode starts.
                </blockquote>
            </Modal> */}
            {/* This will be a tooltip */}
            {reminderResponse !== '' && <blockquote id="add-reminder-response">{reminderResponse}</blockquote>}
        </div>
    )
}


export default AddReminder;