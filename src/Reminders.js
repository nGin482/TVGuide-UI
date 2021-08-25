import Remidner from "./ReminderCard";

const Reminders = ({reminders}) => {
    
    if (reminders) {
        return (
            <div id="reminders">
                {reminders.map(reminder => (
                    <Remidner key={reminder.show} reminder={reminder}/>
                ))}
            </div>
        )
    }
    else {
        return (
            <h1>Waiting for reminders to load ...</h1>
        )
    }
}


export default Reminders;