import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { RecordedShow } from "../../utils/types";
import requests from "../requests/requests";
import './RecordedShows.css';

const RecordedShowsPage = () => {
    const [recordedShows, setRecordedShows] = useState<RecordedShow[]>([]);
    const history = useHistory();

    useEffect(() => {
        requests.getRecordedShows().then(data => setRecordedShows(data));
    }, []);

    return (
        <div id="recorded-shows-page">
            <h1>List of Shows Recorded</h1>
            <p>Browse this page to view the episodes recorded for each show.</p>
            <div id="recorded-shows-list">
                {recordedShows.length > 0 && recordedShows.map(show => (
                    <div key={show.show} className="recorded-show" id="recorded-shows-section" onClick={() => history.push(`/shows/${show.show}`)}>
                        <blockquote>{show.show}</blockquote>
                        <blockquote>{show.seasons.length} season{show.seasons.length && 's'}</blockquote>             
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecordedShowsPage;