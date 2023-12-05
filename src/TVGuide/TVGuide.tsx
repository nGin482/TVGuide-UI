import React, { useState } from "react";
// import { useHistory } from "react-router";

import Event from "../Event.js";
import { showStringForGuide, Guide } from "../../utils/";
import './TVGuide.css';

const TVGuide = ({ guide }: { guide: Guide }) => {
    const [service, setService] = useState('All');
    const [openModal, setOpenModal] = useState(false);
    const [eventForModal, setEventForModal] = useState('');
    // const history = useHistory()

    const selectEvent = (event: string) => {
        setOpenModal(true);
        setEventForModal(event);
    };

    const renderGuideData = () => {
        if (service === 'All') {
            return (
                <div id="guide-data">
                    <div className="service" id="Free to Air">
                        <h6 className="service-header">Free to Air</h6>
                        {guide['FTA'].map(show => (
                            <div className="show" key={show.time+show.channel}>
                                <blockquote>{showStringForGuide(show)}</blockquote>
                                {show.event && <button className="see-event" onClick={() => selectEvent(show.event)}>See Event for {show.title}</button>}
                            </div>
                        ))}
                    </div>
                    <div className="service" id="BBC">
                        <h6 className="service-header">BBC Channels</h6>
                        {guide['BBC'].map(show => (
                            <div className="show" key={show.time+show.channel}>
                                <blockquote>{showStringForGuide(show)}</blockquote>
                                <button className="see-event" onClick={() => selectEvent(show.event)}>See Event for {show.title}</button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="service" id={service}>
                    {service === 'FTA' ? <h6 className="service-header">Free to Air</h6> : <h6 className="service-header">BBC Channels</h6>}
                    {guide[service].map(show => (
                        <div className="show" key={show.time+show.channel}>
                            <blockquote>{showStringForGuide(show)}</blockquote>
                            {show.event ? <button className="see-event" onClick={() => selectEvent(show.event)}>See Event for {show.title}</button> : ''}
                        </div>
                    ))}
                </div>
            );
        }
    }

    // const handleClick = () => {
    //     history.push('/shows')
    // }

    return (
        <div id="tv-guide">
            <h4 id="tv-guide-header">Guide</h4>
            <div id="guide-content">
                {renderGuideData()}
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
                <Event openModal={openModal} setOpenModal={setOpenModal} event={eventForModal}/>
            </div>
        </div>
    );
};

export default TVGuide;