import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import './navigationMenu.css';

const NavigationMenu = () => {
    return (
        <BrowserRouter>
            <nav>
                <ul id="navigation-bar">
                    <li className="nav-link"><NavLink activeClassName="active" exact to='/'>Home</NavLink></li>
                    <li className="nav-link"><NavLink activeClassName="active" to='/show-list'>Show List</NavLink></li>
                    <li className="nav-link"><NavLink activeClassName="active" to='/shows'>Shows</NavLink></li>
                    <li className="nav-link"><NavLink activeClassName="active" to='/reminders'>Reminders</NavLink></li>
                    
                </ul>
            </nav>
            <Switch>
                <Route path='/show-list'></Route>
                <Route path='/shows'></Route>
                <Route path='/reminders'></Route>
                <Route path='/'></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default NavigationMenu;