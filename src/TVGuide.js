import { useState } from "react";
// import { useHistory } from "react-router";
import utilFunctions from './utils/utils.js';
import './TVGuide.css';

const TVGuide = ({guide, message}) => {
    const [service, setService] = useState('All')
    // const history = useHistory()

    const renderGuideData = () => {
        if (service === 'All') {
            return (
                <div id="guide-data">
                    <div className="service" id="Free to Air">
                        <h6 className="service-header">Free to Air</h6>
                        {guide['FTA'].map(show => (
                            <blockquote className="show" key={show.time+show.channel}>{utilFunctions.showDetails(show)}</blockquote>
                        ))}
                    </div>
                    <div className="service" id="BBC">
                        <h6 className="service-header">BBC Channels</h6>
                        {guide['BBC'].map(show => (
                            <blockquote className="show" key={show.time+show.channel}>{utilFunctions.showDetails(show)}</blockquote>
                        ))}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="service" id={service}>
                    {service === 'FTA' ? <h6 className="service-header">Free to Air</h6> : <h6 className="service-header">BBC Channels</h6>}
                    {guide[service].map(show => (
                        <blockquote className="show" key={show.time+show.channel}>{utilFunctions.showDetails(show)}</blockquote>
                    ))}
                </div>
            )
        }
    }

    // const handleClick = () => {
    //     history.push('/shows')
    // }

    const display = () => {
        if (message !== '') {
            return (
                <blockquote id="message">{message}</blockquote>
            )
        }
        else if (guide) {
            return (
                <div id="guide-content">
                    {renderGuideData()}
                    {filters()}
                </div>
                
            )
        }
        else {
            return (
                <blockquote>Waiting for the TV guide data to be retrieved ...</blockquote>
            )
        }
    }

    const filters = () => (
        <div id="service-filter">
            <div className="select-service" id="select-fta" onClick={() => setService('FTA')}>
                Free to Air
            </div>
            <div className="select-service" id="select-bbc" onClick={() => setService('BBC')}>
                BBC Channels
            </div>
            <div className="select-service" id="select-bbc" onClick={() => setService('All')}>
                All
            </div>
        </div>
    )

    return (
        <div id="tv-guide">
            <h4 id="tv-guide-header">Guide</h4>
            {display()}
        </div>
    )
}

export default TVGuide;