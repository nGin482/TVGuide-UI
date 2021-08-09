import { useState, useEffect } from "react";
import requests from "./requests/requests.js";

const ShowList = () => {
    const [showList, setShowList] = useState([])

    useEffect(() => {
        requests.getShowList().then(data => {
            setShowList(data)
        }).catch(err => {
            console.log(err)
        })
    }, []
    )

    return (
        <div id="list-of-shows">
            {showList.map(show => (
                <div className="show" key={show}>
                    <blockquote className="show-header">{show}</blockquote>
                </div>
            ))}
        </div>
    )


}

export default ShowList;