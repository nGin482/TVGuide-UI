import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import Cookies from "universal-cookie";

import { UserContext } from "../contexts/UserContext";
import './navigationMenu.css';

const NavigationMenu = () => {
    const [activeItem, setActiveItem] = useState(window.location.pathname.replace('/', ''));
    const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);

    const { user, setUser } = useContext(UserContext);
    const cookies = new Cookies('user', { path: '/' });

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

    const logout = () => {
        cookies.remove('user');
        setUser(null);
    };

    useEffect(() => {
        setMenuItems(items);
    }, []);

    useEffect(() => {
        if (user) {
            setMenuItems(prevMenuItems => {
                const menuItems = [...prevMenuItems];

                const loginIndex = menuItems.findIndex(item => item.key === 'login');
                menuItems[loginIndex] = {
                    label: 'Profile',
                    key: 'profile',
                    children: [
                        {
                            label: 'Your Profile',
                            key: 'profile-page'
                        },
                        {
                            label: <NavLink to="/" onClick={logout}>Logout</NavLink>,
                            key: 'logout'
                        }
                    ]
                };
                return menuItems;
            });
        }
        else {
            setMenuItems(items);
        }
    }, [user]);

    return (
        <Menu 
            onClick={menuItem => setActiveItem(menuItem.key)}
            mode="horizontal"
            items={menuItems}
            selectedKeys={[activeItem]}
            theme="dark"
            style={{justifyContent: "center"}}
        />
    );
};

export default NavigationMenu;