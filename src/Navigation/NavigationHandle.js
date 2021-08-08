import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationMenu from "./NavigationMenu.js";
import Home from "../Home.js";

const NavigationHandle = () => {
    return (
        <BrowserRouter>
            <NavigationMenu/>
            <Switch>
                <Route path='/show-list'></Route>
                <Route path='/shows'></Route>
                <Route path='/reminders'></Route>
                <Route path='/'><Home/></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default NavigationHandle;