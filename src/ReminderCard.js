import './ReminderCard.css';

const ReminderCard = ({reminder}) => (
    <div className="reminder-card">
        <h4>{reminder.show}</h4>
        <blockquote className="reminder time">You will be reminded {reminder['reminder time']} minutes {reminder['reminder alert'].toLowerCase()} an episode starts</blockquote>
        <blockquote className="interval">{reminder.interval}</blockquote>
    </div>
)


export default ReminderCard;