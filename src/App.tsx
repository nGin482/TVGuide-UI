import { useState } from "react";
import { ConfigProvider } from 'antd';
import Cookies from "universal-cookie";

import NavigationHandle from './Navigation/NavigationHandle';
import { UserContext } from "./contexts/UserContext";
import { RecordedShowsContext, RemindersContext } from "./contexts";
import { CurrentUser, RecordedShowModel, Reminder } from "./utils";

const theme = {
    token: {
        colorPrimary: '#00b96b'
    }
};

function App() {
    const cookies = new Cookies('user', { path: '/' });
    const userCookie = cookies.get('user')

    const [currentUser, setUser] = useState<CurrentUser>(userCookie);
    const [recordedShows, setRecordedShows] = useState<RecordedShowModel[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    
    return (
        <ConfigProvider theme={theme}>
            <RecordedShowsContext.Provider value={{ recordedShows, setRecordedShows }}>
                <RemindersContext.Provider value={{ reminders, setReminders }}>
                    <UserContext.Provider value={{ currentUser, setUser }}>
                        <div className="App">
                            <NavigationHandle/>
                        </div>
                    </UserContext.Provider>
                </RemindersContext.Provider>
            </RecordedShowsContext.Provider>
        </ConfigProvider>
    );
};

export default App;
