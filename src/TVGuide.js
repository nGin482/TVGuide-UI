import { useState, useEffect } from "react";
// import { useHistory } from "react-router";
import requests from "./requests/requests.js";
import './TVGuide.css';

const TVGuide = () => {
    const [guide, setGuide] = useState(null)
    const [message, setMessage] = useState('')
    // const history = useHistory()
    
    useEffect(() => {
        requests.getGuide().then(data => {
            console.log(data)
            setGuide(data)
        }).catch(err => {
            console.log(err)
            setMessage(err)
        })
    }, []
    )

    const renderGuideData = () => {
        return (
            <div id="guide-data">
                <div id="Free to Air">
                    <h6>Free to Air</h6>
                    {guide['FTA'].map(show => (
                        <blockquote className="show" key={show.time}>{showDetails(show)}</blockquote>
                    ))}
                </div>
                <div id="BBC">
                    <h6>BBC Channels</h6>
                    {guide['BBC'].map(show => (
                        <blockquote className="show" key={show.time}>{showDetails(show)}</blockquote>
                    ))}
                </div>
            </div>
        )
    }

    const showDetails = (show) => {
        let showMessage = show.time + ': ' + show.title + ' is on ' + show.channel

        if (show.series_num) {
            showMessage = showMessage + ' (Series ' + show.series_num + ', Episode ' + show.episode_num + ')'
            if (show.episode_title) {
                showMessage = showMessage.substring(0, showMessage.length-2) + ': ' + show.episode_title + ')'
            }
        }
        else {
            showMessage = showMessage + ' (' + show.episode_title + ')'
        }

        if (show.repeat) {
            showMessage = showMessage + ' (Repeat)'
        }

        return showMessage
    }

    // const handleClick = () => {
    //     history.push('/shows')
    // }


    if (guide) {
        return (
            <div id="tv-guide">
                <h4>Guide</h4>
                {message === '' ? renderGuideData() : <p>{message}</p>}
            </div>
        )
    }
    else {
        return (
            <div id="tv-guide">
                <h4>Guide</h4>
                {message === '' ? <blockquote>Waiting for the TV guide data to be retrieved ...</blockquote> : <p>{message}</p>}
                
            </div>
        )
    }
}

export default TVGuide;