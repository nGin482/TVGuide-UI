import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import AddShow from "../AddShow";
import { getShowList, removeShowFromList } from "../requests/requests";
import '../ShowList.css';

const ShowListPage = () => {
    const [showList, setShowList] = useState<string[]>([]);
    const [result, setResult] = useState('');
    const [openResultModal, setOpenResultModal] = useState(false);

    useEffect(() => {
        getShowList().then(showList => setShowList(showList));
    }, []);

    const deleteShowFromList = (show: string) => {
        removeShowFromList(show).then(data => {
            setResult(data.message);
            setOpenResultModal(true);
        })
        .catch(error => {
            setResult(error.response?.data.message)
        });
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
                <Modal isOpen={openResultModal}>
                    <button onClick={() => setOpenResultModal(false)}>Close</button>
                    <blockquote>{result}</blockquote>
                </Modal>
            </div>
            <AddShow/>
        </div>
    );
};

export default ShowListPage;