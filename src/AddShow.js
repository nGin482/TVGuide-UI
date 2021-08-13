import { useState } from "react";
import requests from "./requests/requests";

import './AddShow.css';


const AddShow = () => {
    const [showToAdd, setShowToAdd] = useState('')

    const addShowSubmission = event => {
        event.preventDefault()
        requests.addShowToList(showToAdd).then(data => console.log(data)).catch(err => console.log(err.response))
    }

    return (
        <div id="add-show">
            <form onSubmit={event => addShowSubmission(event)}>
                <input type="text" id="show-to-add" placeholder="Show name" onChange={event => setShowToAdd(event.target.value)}/>
                <input type="submit" id="submit-show" value={'Add '+showToAdd}/>
            </form>
        </div>
    )
}

export default AddShow;