import { useState, useEffect } from "react";
import requests from "./requests/requests";

const RecordedShowsPage = () => {
    const [recordedShows, setRecordedShows] = useState([])

    useEffect(() => {
        requests.getRecordedShows().then(data => {
            setRecordedShows(data)
        })
    })

    return (
        <div id="recorded-shows-page">
            <h1>List of Shows</h1>
            <p>Browse this page to view the episodes recorded for each show.</p>
        </div>
    )
}

export default RecordedShowsPage;