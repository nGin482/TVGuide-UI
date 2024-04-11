import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "antd";

import { RecordedShowsContext } from "../contexts";
import './styles/RecordedShows.css';

const RecordedShowsPage = () => {
    const history = useHistory();
    const { recordedShows } = useContext(RecordedShowsContext);

    return (
        <div id="recorded-shows-page">
            <h1>List of Shows Recorded</h1>
            <p>Browse this page to view the episodes recorded for each show.</p>
            <div id="recorded-shows-list">
                {recordedShows.length > 0 && recordedShows.map(show => (
                    <Card
                        key={show.show}
                        className="recorded-show"
                        onClick={() => history.push(`/shows/${show.show}`)}
                        title={show.show}
                        
                    >
                        <blockquote>{show.seasons.length} season{show.seasons.length > 1 && 's'}</blockquote>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecordedShowsPage;