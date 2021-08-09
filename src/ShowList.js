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
        <div>
            Show List
            {showList.map(show => (
                <blockquote>{show}</blockquote>
            ))}
        </div>
    )


}

export default ShowList;