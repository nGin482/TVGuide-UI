import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";

import { getRecordedShow } from '../requests/requests';
import { RecordedShowModel } from '../utils';
import BackButton from '../BackButton';
import '../RecordedShowData.css';
import '../EpisodeData.css';

interface RecordedShowParam {
    show: string
};

const RecordedShow = () => {
    const { show } = useParams<RecordedShowParam>();
    const [recordedShow, setRecordedShow] = useState<RecordedShowModel | null>(null);
    const [showEpisodes, setShowEpisodes] = useState(false);
    
    useEffect(() => {
        getRecordedShow(show)
            .then(data => setRecordedShow(data))
            .catch(response => console.log(response));
    }, [show]);


    return (
        recordedShow ? (
            <div id={recordedShow.show}>
                <h1>{recordedShow.show}</h1>
                <BackButton route="/shows" text="Recorded Shows"/>
                {recordedShow.seasons.map(season => (
                    <div className="season">
                        <div id={`season-${season.season_number}`} onClick={() => setShowEpisodes(prevState => !prevState)}>
                            <blockquote>Season {season.season_number}</blockquote>
                            {showEpisodes && (
                                season.episodes.map(episode => (
                                    <div className="episode-data">
                                        <blockquote className="episode-number">Episode Number: {episode.episode_number}</blockquote>
                                        <blockquote className="episode-title">Episode Title: {episode.episode_title}</blockquote>
                                        <div className="episode-channels">
                                            <blockquote>Channels:</blockquote>
                                            {episode.channels.map(channel => (
                                                <blockquote key={'channel-' + channel} className="channel">{channel}</blockquote>
                                            ))}
                                        </div>
                                        Air Dates:
                                        <ul>
                                            {episode.air_dates.map(date => <li>{date}</li>)}
                                        </ul>
                                        {episode.air_dates.length > 2 && <blockquote className="repeat">This episode is a repeat</blockquote>}
                                    </div>                                    
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
        : (
            <h1>Waiting for data to be retrieved for {show} ...</h1>
        )
    );    
};


export default RecordedShow;