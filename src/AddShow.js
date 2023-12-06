import { useState } from "react";
import { addShowToList } from "./requests/requests";

import './AddShow.css';


const AddShow = () => {
    const [showToAdd, setShowToAdd] = useState('')
    const [result, setResult] = useState('')

    const addShowSubmission = event => {
        event.preventDefault()
        addShowToList(showToAdd).then(data => {
            setResult(data.message)
        }).catch(err => {
            setResult(err.response.data.message)
        })
    }

    const clearAddShowInput = () => {
        setShowToAdd('')
        setResult('')
    }

    return (
        <div id="add-show">
            <form onSubmit={event => addShowSubmission(event)}>
                <input type="text" id="show-to-add" placeholder="Show name" value={showToAdd} onChange={event => setShowToAdd(event.target.value)}/>
                {showToAdd === '' ? <input type="submit" id="submit-show" value={'Add Show'}/> : <input type="submit" id="submit-show" value={'Add '+showToAdd}/>}
            </form>
            <blockquote id="add-show-result">{result}</blockquote>
            {result === '' ? '' : <button id="clear-input" onClick={() => clearAddShowInput()}>OK</button>}
        </div>
    )
}

export default AddShow;