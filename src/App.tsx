import { useState } from "react";
import { ConfigProvider } from 'antd';

import NavigationHandle from './Navigation/NavigationHandle';
import { UserContext } from "./contexts/UserContext";
import { User } from "./utils";

const theme = {
    token: {
        colorPrimary: '#00b96b'
    }
};

function App() {
    const [user, setUser] = useState<User>(null);
    
    return (
        <ConfigProvider theme={theme}>
            <UserContext.Provider value={{ user, setUser }}>
                <div className="App">
                    <NavigationHandle/>
                </div>
            </UserContext.Provider>
        </ConfigProvider>
    );
};

export default App;
