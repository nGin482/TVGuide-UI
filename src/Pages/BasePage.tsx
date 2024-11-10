import { useContext } from "react";
import { Alert } from "antd";

import NavigationMenu from "../Navigation/NavigationMenu";
import { Navigator } from "../Navigation/Navigator";
import { ErrorsContext } from "../contexts";
import '../index.css';

const BasePage = () => {
    const { errors } = useContext(ErrorsContext);

    const AlertDescription = () => (
        <ul id="errors-list">
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
    );

    return (
        <>
            <NavigationMenu />
            <Navigator />
            {errors.length > 0 && (
                <Alert
                    message="Error!"
                    description={<AlertDescription />}
                    type="error" 
                    className="error-alert"                
                />
            )}
        </>
    );
};

export default BasePage;