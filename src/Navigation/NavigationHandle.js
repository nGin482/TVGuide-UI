import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationMenu from "./NavigationMenu.js";
import Home from "../Pages/Home.js";
import ShowListPage from "../Pages/ShowListPage.js";
import RecordedShowsPage from "../Pages/RecordedShowsPage.js";
import RecordedShow from "../Pages/RecordedShow.js";
import RemindersPage from "../Pages/RemindersPage.js";

const NavigationHandle = () => {
    return (
        <BrowserRouter>
            <NavigationMenu/>
            <Switch>
                <Route path='/show-list'><ShowListPage/></Route>
                <Route exact path='/shows'><RecordedShowsPage/></Route>
                <Route path='/shows/:show'><RecordedShow/></Route>
                <Route path='/reminders'><RemindersPage/></Route>
                <Route path='/'><Home/></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default NavigationHandle;