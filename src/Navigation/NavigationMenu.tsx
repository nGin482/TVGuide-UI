import { NavLink } from "react-router-dom";
import routes from "./routes.js";
import './navigationMenu.css';

const NavigationMenu = () => {
    return (
        <nav>
            <ul id="navigation-bar">
                {routes.map(route => (
                    <li className="nav-link" key={route.text}>
                        <NavLink
                            activeClassName="active"
                            exact={route.path === '/'}
                            to={route.path}
                        >
                            {route.text}
                        </NavLink> 
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavigationMenu