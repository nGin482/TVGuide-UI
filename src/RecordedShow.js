import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import requests from './requests/requests';

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
            <h1>{recordedShow.show}</h1>
        )
    }
    else {
        return (
            <h1>Waiting for data to be retrieved for {urlparameter} ...</h1>
        )
    }
    
}


export default RecordedShow;