import './CloseButton.css';

const CloseButton = ({text, action}) => {
    
    return (
        <button id="close-button" onClick={() => action()}>{text}</button>
    )
}


export default CloseButton;