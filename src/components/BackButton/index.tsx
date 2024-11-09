import { Button } from "antd";
import { Link } from "react-router-dom";

import './BackButton.css';

interface BackButtonProps {
    route: string
    text: string
}

const BackButton = ({ route, text }: BackButtonProps) => (
    <Link to={route} id="back-link">
        <Button className="back-button">Back to {text}</Button>
    </Link>
);


export default BackButton;