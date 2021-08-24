import { useState } from 'react';
import EpisodeData from './EpisodeData';

const SeasonData = ({season}) => {
    const [showEpisodes, setShowEpisodes] = useState(false)
    
    const alternateDisplayEpisodes = () => {
        setShowEpisodes(!showEpisodes)
        console.log(showEpisodes)
    }
    
    const displayEpisodes = () => {
        if (showEpisodes) {
            return (
                season.episodes.map(episode => (
                    <EpisodeData key={episode['episode number']} episode={episode}/>
                ))
            )
        }
    }
    
    return (
        <div id={'season-' + season['season number']} onClick={() => alternateDisplayEpisodes()}>
            <blockquote>Season {season['season number']}</blockquote>
            {displayEpisodes(season.episodes)}
        </div>
    )    
}


export default SeasonData;