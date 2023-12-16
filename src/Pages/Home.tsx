import React, { useState, useEffect } from "react";

import TVGuide from "../TVGuide/TVGuide";
import RegisterUser from "../components/Registration/RegisterUser";
import { getGuide } from "../requests/requests";
import { Guide } from "../utils";

const Home = () => {
    const [guide, setGuide] = useState<Guide | null>(null);
    const [guideError, setGuideError] = useState<string>('');

    useEffect(() => {
        getGuide()
            .then((data) => setGuide(data))
            .catch((err: any) => {
                if (err.response?.data.message) {
                    setGuideError(err.response.data.message);
                }
                else {
                    setGuideError('There is a problem communicating with the server');
                }
            })
    }, []);

    return (
        <div id="home">
            <h1>TV Guide</h1>
            {guide ? <TVGuide guide={guide} /> : <blockquote id="message">{guideError}</blockquote>}
            <RegisterUser/>
        </div>
    );
};

export default Home;