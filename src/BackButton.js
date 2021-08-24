import { useHistory } from "react-router";
import './BackButton.css';

const BackButton = ({previous}) => {
    
    const history = useHistory();
    const goBack = () => {
        history.push(previous.route)
    }
    
    return (
        <button id="back-button" onClick={() => goBack()}>Back to {previous.text}</button>
    )
}


export default BackButton;