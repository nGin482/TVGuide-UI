import React, { useState, useEffect } from "react";

import TVGuide from "../TVGuide/TVGuide.js";
import RegisterUser from "../RegisterUser.js";
import requests from "../requests/requests.js";

import { Guide } from "../../utils/types.js";

const Home = () => {
    const [guide, setGuide] = useState<Guide | null>(null);
    const [guideError, setGuideError] = useState<string>('');

    useEffect(() => {
        requests.getGuide().then((data: Guide) => {
            console.log(data)
            setGuide(data);
        }).catch(err => {
            if (err.response) {
                if (err.response.status === 404) {
                    setGuideError(err.response.data.message);
                }
            }
            else {
                setGuideError('There is an error happening');
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