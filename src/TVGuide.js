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

    const renderGuideData = () => {
        return (
            <div id="guide-data">
                <div className="service" id="Free to Air">
                    <h6 className="service-header">Free to Air</h6>
                    {guide['FTA'].map(show => (
                        <blockquote className="show" key={show.time}>{showDetails(show)}</blockquote>
                    ))}
                </div>
                <div className="service" id="BBC">
                    <h6 className="service-header">BBC Channels</h6>
                    {guide['BBC'].map(show => (
                        <blockquote className="show" key={show.time}>{showDetails(show)}</blockquote>
                    ))}
                </div>
            </div>
        )
    }

    // const handleClick = () => {
    //     history.push('/shows')
    // }

    const display = () => {
        if (message !== '') {
            return (
                <p>{message}</p>
            )
        }
        else if (guide) {
            return (
                renderGuideData()
            )
        }
        else {
            return (
                <blockquote>Waiting for the TV guide data to be retrieved ...</blockquote>
            )
        }
    }

    return (
        <div id="tv-guide">
            <h4 id="tv-guide-header">Guide</h4>
            {display()}
        </div>
    )
}

export default TVGuide;