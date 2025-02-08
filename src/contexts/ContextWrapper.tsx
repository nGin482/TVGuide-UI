import { useState, useEffect, JSX } from "react";
import Cookies from "universal-cookie";

import { RecordedShowsContext, RemindersContext, SearchListContext, UserContext, ErrorsContext } from "../contexts";
import { CurrentUser, Reminder, SearchItem, ShowData } from "../utils/types";
import { getShows } from "../requests";

const ContextWrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const cookies = new Cookies('user', { path: '/' });
    const userCookie = cookies.get('user')
    
    const [currentUser, setUser] = useState<CurrentUser>(userCookie);
    const [shows, setShows] = useState<ShowData[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [searchList, setSearchList] = useState<SearchItem[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        fetchShows();
    }, []);

    const fetchShows = async () => {
        try {
            const shows = await getShows();
            setShows(shows);
        }
        catch(error) {
            setErrors(prev => [...prev, catchError(error, 'Recorded Shows')]);
        }
    };

    const catchError = (error, resource: string) => {
        if (error?.response) {
            console.log('response?')
            console.log(error.message)
            console.log(error.response)
            return `${resource}: ${error.response?.data?.message || error.message}`;
        }
        else if (error?.message) {
            return error.message;
        }
        return `Unable to communicate with server to retrieve ${resource}`;
    };

    return (
        <RecordedShowsContext.Provider value={{ shows, setShows }}>
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