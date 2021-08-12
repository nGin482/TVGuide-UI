import { useState, useEffect } from "react";
import TVGuide from "./TVGuide.js";
import Events from "./Events.js";
import requests from "./requests/requests.js";

const Home = () => {
    const [guide, setGuide] = useState(null)
    const [events, setEvents] = useState([])
    const [guideError, setGuideError] = useState('')
    const [eventsError, setEventsError] = useState('')
    const [showEvents, setShowEvents] = useState(true)

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

    const linkGuidetoEpisode = () => {
        const filteredFTAGuide = guide['FTA'].filter(show => show.channel !== 'ABCHD')
        const filteredGuide = filteredFTAGuide.concat(guide['BBC'])

        if (filteredGuide.length === events.length) {
            filteredGuide.forEach((show, index) => {
                show.event = events[index]
            });
        }
        else {
            return 'Unable to link the shows to the events.'
        }
        console.log(filteredGuide)

    }

    if (guide && events) {
        return (
            <div id="home">
                <h1>TV Guide</h1>
                <TVGuide guide={guide} message={guideError}/>
                {linkGuidetoEpisode()}
                {showEvents ? <button onClick={() => setShowEvents(false)}>Hide Events</button> : <button onClick={() => setShowEvents(true)}>Show Events</button>}
                {showEvents ? <Events events={events} error={eventsError}/> : ''}
            </div>
        )
    }
    else {
        return (
        <div id="home">
            <h1>TVGuide</h1>
            Waiting for data to be retrieved ...
        </div>
        )
    }
}

export default Home;