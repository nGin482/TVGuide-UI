import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../Pages/Home";
import ShowListPage from "../Pages/ShowListPage";
import RecordedShowsPage from "../Pages/RecordedShowsPage";
import RecordedShow from "../Pages/RecordedShow";
import RemindersPage from "../Pages/RemindersPage";
import LoginPage from "../Pages/LoginPage";
import ProfilePage from "../Pages/ProfilePage";
import ProfileSettingsPage from "../Pages/ProfileSettingsPage";
import { UserContext } from "../contexts/UserContext";

const NavigationHandle = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <Switch>
            <Route path='/show-list'><ShowListPage /></Route>
            <Route exact path='/shows'><RecordedShowsPage /></Route>
            <Route path='/shows/:show'><RecordedShow /></Route>
            <Route path='/reminders'><RemindersPage /></Route>
            <Route path="/profile/:user" exact><ProfilePage /></Route>
            <Route path="/profile/:user/settings"><ProfileSettingsPage user={currentUser} /></Route>
            <Route path="/login">{currentUser ? <Redirect to={`/profile/${currentUser.username}`} /> : <LoginPage />}</Route>
            <Route path='/'><Home/></Route>
        </Switch>
    );
};

export default NavigationHandle;