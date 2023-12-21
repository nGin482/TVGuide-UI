import React, { useState, useContext, FormEvent } from "react";

import { UserContext } from "./contexts/UserContext";
import { addShowToList } from "./requests/requests";
import './AddShow.css';


const AddShow = () => {
    const [showToAdd, setShowToAdd] = useState('');
    const [result, setResult] = useState('');
    const { user } = useContext(UserContext);

    const addShowSubmission = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await addShowToList(showToAdd, user.token);
        if (response.result === 'success') {
            setResult(response.message);
            setShowToAdd('');
            setResult('');
        }
        else {
            setResult(response.payload.message);
        }
    };

    return (
        <div id="add-show">
            <form onSubmit={event => addShowSubmission(event)}>
                <input type="text" id="show-to-add" placeholder="Show name" value={showToAdd} onChange={event => setShowToAdd(event.target.value)}/>
                <input type="submit" id="submit-show" disabled={showToAdd ? false : true} value={showToAdd ? `Add ${showToAdd}` : "Add Show"} />
            </form>
            <blockquote id="add-show-result">{result}</blockquote>
        </div>
    );
};

export default AddShow;