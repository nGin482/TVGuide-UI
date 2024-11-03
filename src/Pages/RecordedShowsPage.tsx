import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card } from "antd";

import { RecordedShowsContext } from "../contexts";
import './styles/RecordedShows.css';

const RecordedShowsPage = () => {
    const history = useHistory();
    const { shows } = useContext(RecordedShowsContext);

    return (
        <div id="recorded-shows-page">
            <Helmet>
                <title>Recorded Shows | TVGuide</title>
            </Helmet>
            <h1>List of Shows Recorded</h1>
            <p>Browse this page to view the episodes recorded for each show.</p>
            <div id="recorded-shows-list">
                {shows.length > 0 && shows.map(show => (
                    <Card
                        key={show.show_name}
                        className="recorded-show"
                        onClick={() => history.push(`/shows/${show.show_name}`)}
                        title={show.show_name}
                        
                    >
                        <blockquote>{show.show_episodes.length} season{show.show_episodes.length > 1 && 's'}</blockquote>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecordedShowsPage;