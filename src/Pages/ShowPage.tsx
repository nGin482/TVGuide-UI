import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Alert } from "antd";
import { Helmet } from "react-helmet";

import { ShowDetails } from "../components/ShowDetails";
import BackButton from "../components/BackButton";
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
    console.log(location)

    useEffect(() => {
        const showDetail = shows.find(showData => showData.show_name === show);
        setshowData(showDetail);
    }, [show, shows]);

    return (
        showData ? (
            <div id={showData.show_name}>
                <Helmet>
                    <title>{showData.show_name} Details | TVGuide</title>
                </Helmet>
                <h1>{showData.show_name}</h1>
                <BackButton route="/shows" text="Recorded Shows"/>
                <ShowDetails showDetails={showData.show_details} />
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