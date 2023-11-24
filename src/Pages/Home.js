import { useState, useEffect } from "react";
import TVGuide from "../TVGuide/TVGuide.js";
import Events from "../Events.js";
import RegisterUser from "../RegisterUser.js";
import requests from "../requests/requests.js";

const Home = () => {
    const [guide, setGuide] = useState(null)
    const [guideError, setGuideError] = useState('')
    
    const [events, setEvents] = useState([])
    const [eventsError, setEventsError] = useState('')
    const [showEvents, setShowEvents] = useState(true)

    useEffect(() => {
        requests.getGuide().then(data => {
            console.log(data)
            setGuide(data)
        }).catch(err => {
            if (err.response) {
                if (err.response.status === 404) {
                    setGuideError(err.response.data.message)
                }
            }
            else {
                setGuideError('There is an error happening')
            }
        })
        
        requests.getEvents().then(data => {
            setEvents(data)
        }).catch(err => {
            console.log(err)
            setEventsError('An error is happening.')
        })
    }, []
    )

    const linkGuidetoEpisode = () => {
        if (guide) {
            const filteredFTAGuide = guide['FTA'].filter(show => show.channel !== 'ABCHD')
            const filteredGuide = filteredFTAGuide.concat(guide['BBC'])
    
            filteredGuide.forEach(guide => {
                events.forEach(event => {
                    if (guide.time === event.show.time && guide.channel === event.show.channel) {
                        guide.event = event
                    }
                })
            })
        }

    }

    return (
        <div id="home">
            <h1>TV Guide</h1>
            <TVGuide guide={guide} message={guideError}/>
            {linkGuidetoEpisode()}
            {showEvents ? <button onClick={() => setShowEvents(false)}>Hide Events</button> : <button onClick={() => setShowEvents(true)}>Show Events</button>}
            {showEvents ? <Events events={events} error={eventsError}/> : ''}
            <RegisterUser/>
        </div>
    )
}

export default Home;