import { useState, useEffect } from "react";
import RecordedShows from "../RecordedShows";
import requests from "../requests/requests";

const RecordedShowsPage = () => {
    const [recordedShows, setRecordedShows] = useState([])

    useEffect(() => {
        requests.getRecordedShows().then(data => {
            setRecordedShows(data)
        })
    }, []
    )

    return (
        <div id="recorded-shows-page">
            <h1>List of Shows Recorded</h1>
            <p>Browse this page to view the episodes recorded for each show.</p>
            <RecordedShows recordedShows={recordedShows}/>
        </div>
    )
}

export default RecordedShowsPage;