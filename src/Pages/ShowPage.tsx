import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Alert } from "antd";
import { Helmet } from "react-helmet";

import { ShowDetails } from "../components/ShowDetails";
import { ShowEpisodes } from "../components/ShowEpisode";
import { SearchItem } from "../components/SearchItem";
import { RecordedShowsContext } from "../contexts";
import { ShowData } from "../utils/types";

interface ShowParam {
    show: string
};

const ShowPage = () => {
    const { show } = useParams<ShowParam>();
    const [showData, setshowData] = useState<ShowData>(null);

    const { shows } = useContext(RecordedShowsContext);
    const location = useLocation();

    useEffect(() => {
        const showDetail = shows.find(showData => showData.show_name === show);
        setshowData(showDetail);
    }, [show, shows]);

    return (
        showData ? (
            <div id={showData.show_name} className="show-content">
                <Helmet>
                    <title>{showData.show_name} Details | TVGuide</title>
                </Helmet>
                <h1>{showData.show_name}</h1>
                <ShowDetails showDetails={showData.show_details} />
                {location.pathname.includes("episodes") && (
                    <ShowEpisodes
                        episodes={showData.show_episodes}
                        showName={showData.show_name}
                    />
                )}
                {location.pathname.includes("search") && (
                    <SearchItem searchItem={showData.search_item} show={showData.show_name} />
                )}
            </div>
        ) : (
            <>
                <h1>{show}</h1>
                <Alert type="error" message="A problem occurred retrieving the data for this show" />
            </>
        )
    )
};

export { ShowPage };