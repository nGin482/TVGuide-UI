import ReminderCard from "./ReminderCard";

const Reminders = ({reminders, message}) => {
    
    if (reminders) {
        return (
            <div id="reminders">
                {reminders.map(reminder => (
                    <ReminderCard key={reminder.show} reminder={reminder}/>
                ))}
            </div>
        )
    }
    else {
        return (
            <div id="reminders">
                <h1>{message}</h1>
            </div>
        )
    }
}


export default Reminders;