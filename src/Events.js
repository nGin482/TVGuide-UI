import './Events.css';

const Events = ({events, error}) => {
    
    const displayEvent = show_event => {
        const displayShow = () => {
            if (show_event.show) {
                let showText = show_event.show.title + ' Season ' + show_event.show.series_num + ', Episode '
                if (show_event.show.episode_title !== '') {
                    showText = showText + show_event.show.episode_title
                }
                else {
                    showText = showText + show_event.show.episode_num
                }
                
                return showText
            }
        }

        return (
            <div className="show-event">
                <blockquote className="show_identifier">{displayShow()}</blockquote>
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