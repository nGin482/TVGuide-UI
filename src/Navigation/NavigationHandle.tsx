import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavigationMenu from "./NavigationMenu";
import Home from "../Pages/Home";
import ShowListPage from "../Pages/ShowListPage";
import RecordedShowsPage from "../Pages/RecordedShowsPage";
import RecordedShow from "../Pages/RecordedShow";
import RemindersPage from "../Pages/RemindersPage";
import RegisterUser from "../RegisterUser";
import Login from "../components/Login/Login";

const NavigationHandle = () => {
    return (
        <BrowserRouter>
            <NavigationMenu/>
            <Switch>
                <Route path='/show-list'><ShowListPage/></Route>
                <Route exact path='/shows'><RecordedShowsPage/></Route>
                <Route path='/shows/:show'><RecordedShow/></Route>
                <Route path='/reminders'><RemindersPage/></Route>
                <Route path="/login"><Login /></Route>
                <Route path='/'><Home/></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default NavigationHandle;