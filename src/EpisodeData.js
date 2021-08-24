import './EpisodeData.css';

const EpisodeData = ({episode}) => {
    
    return (
        <div className="episode-data">
            <blockquote className="episode-number">Episode Number: {episode['episode number']}</blockquote>
            <blockquote className="episode-title">Episode Title: {episode['episode title']}</blockquote>
            <blockquote className="first-air-date">First Air Date: {episode['first air date']}</blockquote>
            {episode.repeat ? <blockquote className="repeat">This episode is a repeat</blockquote> : ''}
            
        </div>
    )
}


export default EpisodeData;