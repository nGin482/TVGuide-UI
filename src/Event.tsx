import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-modal';

import { showStringForEvent } from './utils';

interface EventProps {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
    event: string
};

const Event = ({ openModal, setOpenModal, event }: EventProps) => {
    // Modal.setAppElement('#menu-items')
    if (event) {
        Modal.setAppElement('#navigation-bar');
        return (
            <Modal isOpen={openModal}>
                <button onClick={() => setOpenModal(false)}>Close</button>
                <div className="show-event">
                    <blockquote className="show_identifier">{showStringForEvent(event)}</blockquote>
                    <blockquote className="event">{event}</blockquote>
                </div>
            </Modal>
        );
    }
    else {
        return (
            <Modal isOpen={openModal}>
                <button onClick={() => setOpenModal(false)}>Close</button>
                <blockquote className="show_identifier">Unable to display any event for this episode</blockquote>
            </Modal>
        );
    }
};

export default Event;