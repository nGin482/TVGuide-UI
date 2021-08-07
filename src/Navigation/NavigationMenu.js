import { NavLink } from "react-router-dom";
import routes from "./routes.js";
import './navigationMenu.css';

const NavigationMenu = () => {
    return (
        <nav>
            <ul id="navigation-bar">
                {routes.map(route => {
                    if (route.path === '/') {
                        return (
                            <li className="nav-link"><NavLink activeClassName="active" exact to={route.path}>{route.text}</NavLink></li>
                        )
                    }
                    else {
                        return (
                            <li className="nav-link"><NavLink activeClassName="active" to={route.path}>{route.text}</NavLink></li>
                        )
                    }
                })}
            </ul>
        </nav>
    )
}

export default NavigationMenu