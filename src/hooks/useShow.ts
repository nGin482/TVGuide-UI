import { useContext } from "react";

import { RecordedShowsContext } from "../contexts";
import { Reminder, SearchItem, ShowData, ShowDetails, ShowEpisode } from "../utils/types";

const useShow = () => {

    const { shows, setShows } = useContext(RecordedShowsContext);

    const addShowToContext = (newShow: ShowData) => {
        setShows(current => [...current, newShow]);
    };

    const updateShowContext = (
        showName: string,
        property: keyof ShowData,
        newData: SearchItem | ShowEpisode[] | Reminder | string | ShowDetails
    ) => {
        const updatedShows = shows.map(show => {
            if (show.show_name === showName) {
                const updatedShow = { ...show, [property]: newData };
                return updatedShow;
            }
            else {
                return show;
            }
        });
        setShows(updatedShows);
    };

    return {
        addShowToContext,
        updateShowContext
    };
};

export { useShow };