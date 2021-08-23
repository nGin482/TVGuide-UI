import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationMenu from "./NavigationMenu.js";
import Home from "../Home.js";
import ShowListPage from "../ShowListPage.js";
import RecordedShowsPage from "../RecordedShowsPage.js";
import RecordedShow from "../RecordedShow.js";

const NavigationHandle = () => {
    return (
        <BrowserRouter>
            <NavigationMenu/>
            <Switch>
                <Route path='/show-list'><ShowListPage/></Route>
                <Route exact path='/shows'><RecordedShowsPage/></Route>
                <Route path='/shows/:show'><RecordedShow/></Route>
                <Route path='/reminders'></Route>
                <Route path='/'><Home/></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default NavigationHandle;