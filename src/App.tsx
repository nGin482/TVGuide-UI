import { useState } from "react";
import { ConfigProvider } from 'antd';
import Cookies from "universal-cookie";

import NavigationHandle from './Navigation/NavigationHandle';
import { UserContext } from "./contexts/UserContext";
import { CurrentUser } from "./utils";

const theme = {
    token: {
        colorPrimary: '#00b96b'
    }
};

function App() {
    const cookies = new Cookies('user', { path: '/' });
    const userCookie = cookies.get('user')

    const [currentUser, setUser] = useState<CurrentUser>(userCookie);
    
    return (
        <ConfigProvider theme={theme}>
            <UserContext.Provider value={{ currentUser, setUser }}>
                <div className="App">
                    <NavigationHandle/>
                </div>
            </UserContext.Provider>
        </ConfigProvider>
    );
};

export default App;
