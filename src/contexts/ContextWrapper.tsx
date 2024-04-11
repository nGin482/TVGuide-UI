import { useState, useEffect, JSX } from "react";
import Cookies from "universal-cookie";

import { RecordedShowsContext, RemindersContext, SearchListContext, UserContext, ErrorsContext } from "../contexts";
import { CurrentUser, RecordedShowModel, Reminder, SearchItem } from "../utils/types";
import { getRecordedShows, getReminders, getShowList } from "../requests";

const ContextWrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const cookies = new Cookies('user', { path: '/' });
    const userCookie = cookies.get('user')
    
    const [currentUser, setUser] = useState<CurrentUser>(userCookie);
    const [recordedShows, setRecordedShows] = useState<RecordedShowModel[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [searchList, setSearchList] = useState<SearchItem[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        getRecordedShows()
            .then(recordedShows => setRecordedShows(recordedShows))
            .catch(error => setErrors(prev => [...prev, catchError(error, 'Recorded Shows')]));
        getReminders()
            .then(reminders => setReminders(reminders))
            .catch(error => setErrors(prev => [...prev, catchError(error, 'Reminders')]));
        getShowList()
            .then(searchList => setSearchList(searchList))
            .catch(error => setErrors(prev => [...prev, catchError(error, 'Search List')]));
    }, []);

    const catchError = (error, resource: string) => {
        if (error?.response) {
            return error.response.data.message;
        }
        return `Unable to communicate with server to retrieve ${resource}`;
    };

    return (
        <RecordedShowsContext.Provider value={{ recordedShows, setRecordedShows }}>
            <RemindersContext.Provider value={{ reminders, setReminders }}>
                <SearchListContext.Provider value={{ searchList, setSearchList }}>
                    <UserContext.Provider value={{ currentUser, setUser }}>
                        <ErrorsContext.Provider value={{ errors, setErrors }}>
                            {children}
                        </ErrorsContext.Provider>
                    </UserContext.Provider>
                </SearchListContext.Provider>
            </RemindersContext.Provider>
        </RecordedShowsContext.Provider>
    );
};

export default ContextWrapper;