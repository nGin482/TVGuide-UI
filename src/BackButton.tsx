import { Link } from "react-router-dom";
import './BackButton.css';

interface BackButtonProps {
    route: string
    text: string
}

const BackButton = ({ route, text }: BackButtonProps) => (
    <Link to={route}><button id="back-button">Back to {text}</button></Link>
);


export default BackButton;