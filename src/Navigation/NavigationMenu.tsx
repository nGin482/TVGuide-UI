import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";

import './navigationMenu.css';

const NavigationMenu = () => {
    const [activeItem, setActiveItem] = useState(window.location.pathname.replace('/', ''));

    const items: MenuProps['items'] = [
        {
            label: <NavLink to="/" exact={true}>Home</NavLink>,
            key: 'home'
        },
        {
            label: <NavLink to="/show-list" exact={false}>Search List</NavLink>,
            key: 'show-list'
        },
        {
            label: <NavLink to="/shows" exact={true}>Recorded Shows</NavLink>,
            key: 'shows'
        },
        {
            label: <NavLink to="/reminders" exact={false}>Reminders</NavLink>,
            key: 'reminders'
        },
        {
            label: <NavLink to="/login" exact={false}>Login</NavLink>,
            key: 'login'
        }
    ];

    return (
        <Menu 
            onClick={menuItem => setActiveItem(menuItem.key)}
            mode="horizontal"
            items={items}
            selectedKeys={[activeItem]}
            theme="dark"
            style={{justifyContent: "center"}}
        />
    );
};

export default NavigationMenu