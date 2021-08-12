import './Events.css';

import utilFunctions from './utils/utils';

const Events = ({events, error}) => {
    
    const displayEvent = show_event => {
        return (
            <div className="show-event">
                <blockquote className="show_identifier">{utilFunctions.displayShow(show_event)}</blockquote>
                {show_event.repeat ? <blockquote className="repeat">{show_event.repeat.message}</blockquote> : ''}
                {show_event.channel ? <blockquote className="channel">{show_event.channel.message}</blockquote> : ''}
                {show_event.insert_episode_result ? <blockquote className="channel">{show_event.insert_episode_result.message}</blockquote> : ''}
                {show_event.result ? <blockquote className="channel">{show_event.result.message}</blockquote> : ''}
            </div>
        )
    }
    
    return (
        <div id="events">
            <h4>Events</h4>
            {error !== '' ? <blockquote id="error-message">{error}</blockquote> : ''}
            {events.map(show_event => (
                displayEvent(show_event)
            ))}
        </div>
    )
}

export default Events;