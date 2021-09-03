import utilFunctions from './utils/utils';
import Modal from 'react-modal';

const Event = ({openModal, setOpenModal, event}) => {
    // Modal.setAppElement('#menu-items')
    if (event) {
        Modal.setAppElement('#navigation-bar')
        return (
            <Modal isOpen={openModal}>
                <button onClick={() => setOpenModal(false)}>Close</button>
                <div className="show-event" key={event.show.time+event.show.channel}>
                    <blockquote className="show_identifier">{utilFunctions.showStringForEvent(event)}</blockquote>
                    {event.repeat ? <blockquote className="repeat">{event.repeat.message}</blockquote> : ''}
                    {event.channel ? <blockquote className="channel">{event.channel.message}</blockquote> : ''}
                    {event.insert_episode_result ? <blockquote className="channel">{event.insert_episode_result.message}</blockquote> : ''}
                    {event.result ? <blockquote className="channel">{event.result.message}</blockquote> : ''}
                </div>
            </Modal>
        )
    }
    else {
        return (
            <Modal isOpen={openModal}>
                <button onClick={() => setOpenModal(false)}>Close</button>
                    <blockquote className="show_identifier">Unable to display any event for this episode</blockquote>
            </Modal>
        )
    }
    
}

export default Event;