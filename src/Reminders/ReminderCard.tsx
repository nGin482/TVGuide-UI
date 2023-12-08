import { Reminder } from '../utils';
import './ReminderCard.css';

const ReminderCard = ({ reminder }: { reminder: Reminder }) => (
    <div className="reminder-card">
        <h4>{reminder.show}</h4>
        <blockquote className="reminder time">You will be reminded {reminder.warning_time} minutes {reminder.reminder_alert.toLowerCase()} an episode starts</blockquote>
        <blockquote className="interval">{reminder.occasions}</blockquote>
    </div>
);

export default ReminderCard;