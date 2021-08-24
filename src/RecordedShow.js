import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import requests from './requests/requests';
import SeasonData from './SeasonData';
import './RecordedShowData.css';

const RecordedShow = () => {
    const urlparameter = useParams().show
    const [recordedShow, setRecordedShow] = useState(null)
    
    useEffect(() => {
        requests.getRecordedShow(urlparameter).then(data => {
            setRecordedShow(data.show)
        }).catch(response => {
            console.log(response)
        })
    }, [urlparameter]
    )
    
    if (recordedShow) {
        return (
            <div id={recordedShow.show}>
                <h1>{recordedShow.show}</h1>
                {recordedShow.seasons.map(season => (
                    <div className="seasons">
                        <SeasonData key={season['season number']} season={season}/>
                    </div>
                ))}
            </div>
        )
    }
    else {
        return (
            <h1>Waiting for data to be retrieved for {urlparameter} ...</h1>
        )
    }
    
}


export default RecordedShow;