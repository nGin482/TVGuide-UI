import './ReminderCard.css';

const RemidnerCard = ({reminder}) => (
    <div className="reminder-card">
        <h4>{reminder.show}</h4>
        <blockquote className="reminder time">{reminder['reminder time']}</blockquote>
        <blockquote className="interval">{reminder.interval}</blockquote>
    </div>
)


export default RemidnerCard;