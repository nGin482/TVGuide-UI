import React, { useState, useEffect } from "react";

import AddShow from "../AddShow";
import { getShowList, removeShowFromList } from "../requests/requests";
import '../ShowList.css';

const ShowListPage = () => {
    const [showList, setShowList] = useState<string[]>([]);
    const [result, setResult] = useState('');

    useEffect(() => {
        getShowList().then(showList => setShowList(showList));
    }, []);

    const deleteShowFromList = async (show: string) => {
        const response = await removeShowFromList(show);

        response.result === 'success' ? setResult(response.message) : setResult(response.payload.message);
    };


    return (
        <div id="show-list-page">
            <h1>List of Shows</h1>
            <div id="list-of-shows">
                {showList.map(show => (
                    <div className="show-from-list" key={show}>
                        {/* <img className="show-image" src={show.image} alt={`Image for ${show}`}/> */}
                        <blockquote className="show-header">{show}</blockquote>
                        <button className="remove-show-from-list" onClick={() => deleteShowFromList(show)}>Delete {show}</button>
                    </div>
                ))}
                <blockquote>{result}</blockquote>
            </div>
            <AddShow/>
        </div>
    );
};

export default ShowListPage;