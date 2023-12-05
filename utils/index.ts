import { GuideShow } from "./types";

export const showStringForEvent = (show_event) => {
    if (show_event.show) {
        let showText = show_event.show.title + ' Season ' + show_event.show.series_num + ', Episode '
        if (show_event.show.episode_title !== '') {
            if (show_event.show.episode_num !== '') {
                showText = showText + show_event.show.episode_num + ': '
            }
            showText = showText + show_event.show.episode_title
        }
        else {
            showText = showText + show_event.show.episode_num
        }
        
        return showText
    }
};

export const showStringForGuide = (show: GuideShow) => {
    let showString = `${show.time}: ${show.title} is on ${show.channel}`;

    if (show.season_number && show.episode_title) {
        showString = showString + ` (Season ${show.season_number}, Episode ${show.episode_number}: ${show.episode_title})`;
    }
    else {
        if (show.season_number) {
            showString = showString + ` (Season ${show.season_number}, Episode ${show.episode_number}`;
        }
        if (show.episode_title) {
            showString = showString + ` (${show.episode_title})`;
        }
    }

    if (show.repeat) {
        showString = `${showString} (Repeat)`;
    }

    return showString;
};


export { Guide } from "./types";