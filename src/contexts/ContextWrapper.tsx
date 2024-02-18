import { useState, useEffect, JSX } from "react";
import Cookies from "universal-cookie";

import { RecordedShowsContext, RemindersContext, SearchListContext, UserContext } from "../contexts";
import { CurrentUser, RecordedShowModel, Reminder, SearchItem } from "../utils";
import { getRecordedShows, getReminders, getShowList } from "../requests/requests";

const ContextWrapper = ({ children }: { children: JSX.Element }) => {
    const cookies = new Cookies('user', { path: '/' });
    const userCookie = cookies.get('user')
    
    const [currentUser, setUser] = useState<CurrentUser>(userCookie);
    const [recordedShows, setRecordedShows] = useState<RecordedShowModel[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [searchList, setSearchList] = useState<SearchItem[]>([]);

    useEffect(() => {
        getRecordedShows().then(recordedShows => setRecordedShows(recordedShows));
        getReminders().then(reminders => setReminders(reminders));
        getShowList().then(searchList => setSearchList(searchList));
    }, []);


    return (
        <RecordedShowsContext.Provider value={{ recordedShows, setRecordedShows }}>
            <RemindersContext.Provider value={{ reminders, setReminders }}>
                <SearchListContext.Provider value={{ searchList, setSearchList }}>
                    <UserContext.Provider value={{ currentUser, setUser }}>
                        {children}
                    </UserContext.Provider>
                </SearchListContext.Provider>
            </RemindersContext.Provider>
        </RecordedShowsContext.Provider>
    );
};

export default ContextWrapper;