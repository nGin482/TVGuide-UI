import './EpisodeData.css';

const EpisodeData = ({episode}) => {
    
    const displayEpisodeNumber = () => {
        if (episode['episode number'] === '') {
            return (
                <blockquote className="no-data">Episode Number: No data is given for this</blockquote>
            )
        }
        else {
            return (
                <blockquote className="episode-number">Episode Number: {episode['episode number']}</blockquote>
            )
        }
    }

    const displayEpisodeTitle = () => {
        if (episode['episode title'] === '') {
            return (
                <blockquote className="no-data">Episode Title: No data is given for this</blockquote>
            )
        }
        else {
            return (
                <blockquote className="episode-title">Episode Title: {episode['episode title']}</blockquote>
            )
        }
    }
    
    return (
        <div className="episode-data">
            {displayEpisodeNumber()}
            {displayEpisodeTitle()}
            <div className="episode-channels">
                <blockquote>Channels:</blockquote>
                {episode.channels.map(channel => (
                    <blockquote key={'channel-' + channel} className="channel">{channel}</blockquote>
                ))}
            </div>
            <blockquote className="first-air-date">First Air Date: {episode['first air date']}</blockquote>
            {episode.repeat ? <blockquote className="repeat">This episode is a repeat</blockquote> : ''}
            
        </div>
    )
}


export default EpisodeData;