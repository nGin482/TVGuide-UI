import { useHistory } from "react-router";
import './BackButton.css';

interface BackButtonProps {
    route: string
    text: string
}

const BackButton = ({ route, text }: BackButtonProps) => {
    
    const history = useHistory();
    const goBack = () => {
        history.push(route)
    }
    
    return (
        <button id="back-button" onClick={() => goBack()}>Back to {text}</button>
    );
};


export default BackButton;