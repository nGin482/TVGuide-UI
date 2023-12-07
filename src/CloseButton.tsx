import './CloseButton.css';

interface CloseButtonProps {
    label: string
    callback: () => void
}

const CloseButton = ({ label, callback }: CloseButtonProps) => (
    <button id="close-button" onClick={callback}>{label}</button>
);


export default CloseButton;