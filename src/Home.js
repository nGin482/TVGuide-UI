import { useState, useEffect } from "react";
import TVGuide from "./TVGuide.js";
import Events from "./Events.js";
import requests from "./requests/requests.js";

const Home = () => {
    const [guide, setGuide] = useState(null)
    const [events, setEvents] = useState([])
    const [guideError, setGuideError] = useState('')
    const [eventsError, setEventsError] = useState('')

    useEffect(() => {
        requests.getGuide().then(data => {
            console.log(data)
            setGuide(data)
        }).catch(err => {
            if (err.response.status === 404) {
                setGuideError(err.response.data.message)
            }
            else {
                setGuideError('There is an error happening')
            }
        })
        
        requests.getEvents().then(data => {
            console.log(data)
            setEvents(data)
        }).catch(err => {
            console.log(err)
            setEventsError('An error is happening.')
        })
    }, []
    )

    return (
        <div id="home">
            <h1>TV Guide</h1>
            <TVGuide guide={guide} message={guideError}/>
            <Events events={events} error={eventsError}/>
        </div>
    )
}

export default Home;