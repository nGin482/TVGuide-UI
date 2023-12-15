import { GuideShow, ResponseData, ErrorResponse, User, LoginResponse } from "./types";
import { AxiosResponse } from "axios";

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

export const buildResponseValue = (response: AxiosResponse<any>) => {
    if (response.status === 200) {
        const successResponse: ResponseData = {
            result: 'success',
            message: response.data
        }
        return successResponse;
    }
    const badResponse: ErrorResponse = {
        result: 'error',
        status: response.status,
        statusText: response.statusText,
        payload: response.data
    };
    return badResponse;
};

export const buildLoginResponseValue = (response: AxiosResponse<any>) => {
    if (response.status === 200) {
        const successResponse: LoginResponse = {
            result: 'success',
            message: response.data
        }
        return successResponse;
    }
    const badResponse: ErrorResponse = {
        result: 'error',
        status: response.status,
        statusText: response.statusText,
        payload: response.data
    };
    return badResponse;
};


export type { Guide, RecordedShowModel, Reminder, GuideShow, SearchItem, User, UserContextModel } from "./types";
