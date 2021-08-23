import { useState, useEffect } from "react";
import Modal from 'react-modal';
import requests from "./requests/requests.js";

const ShowList = () => {
    const [showList, setShowList] = useState([])
    const [result, setResult] = useState('')
    const [openResultModal, setOpenResultModal] = useState(false)

    useEffect(() => {
        requests.getShowList().then(data => {
            setShowList(data)
        }).catch(err => {
            console.log(err)
        })
    }, []
    )

    const deleteShowFromList = show => {
        requests.removeShowFromList(show).then(data => {
            setResult(data.message)
            setOpenResultModal(true)
        }).catch(response => {
            setResult(response.data.message)
        })
    }

    return (
        <div id="list-of-shows">
            {showList.map(show => (
                <div className="show-from-list" key={show.show}>
                    <blockquote className="show-header">{show.show}</blockquote>
                    <button className="remove-show-from-list" onClick={() => deleteShowFromList(show.show)}>Delete {show.show}</button>
                </div>
            ))}
            <Modal isOpen={openResultModal}>
                <button onClick={() => setOpenResultModal(false)}>Close</button>
                <blockquote>{result}</blockquote>
            </Modal>
        </div>
    )


}

export default ShowList;