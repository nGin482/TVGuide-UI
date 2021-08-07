import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationMenu from "./NavigationMenu.js";

const NavigationHandle = () => {
    return (
        <BrowserRouter>
            <NavigationMenu/>
            <Switch>
                <Route path='/show-list'></Route>
                <Route path='/shows'></Route>
                <Route path='/reminders'></Route>
                <Route path='/'></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default NavigationHandle;