import axios, { AxiosResponse } from "axios";

import {
    addReminder,
    addShowToList,
    changePassword,
    deleteReminder,
    editReminder,
    getGuide,
    getRecordedShow, 
    getRecordedShows,
    getReminders,
    getShowList,
    getUser,
    login,
    registerNewUser,
    removeShowFromList,
    updateSubscriptions
} from "../requests";
import {
    addSearchItem,
    addSearchItemResponse,
    guide,
    loginRes,
    newUser,
    newUserRes,
    recordedShows,
    reminders,
    searchList,
    tvMazeResult,
    updateSubscriptionsRes,
    user
} from "./test_data";
import { Reminder, SearchItemResponses } from "../utils/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('requests return correct responses', () => {
    
    const response: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        data: null,
        headers: null,
        config: null
    };

    const badResponse: AxiosResponse = {
        status: 404,
        statusText: 'Not Found',
        data: null,
        headers: null,
        config: null
    };

    test('returns 200 when retrieving guide', async () => {
        
        response.data = guide;
        
        mockedAxios.get.mockResolvedValue(response);
        const guideRes = await getGuide();
        expect(guideRes.FTA[0].title).toEqual(guide.FTA[0].title);
    });
    
    // fail condition
    test('throws an error when unable to retrieve TV guide', async () => {
        mockedAxios.get.mockRejectedValue(Error(`${badResponse.status} ${badResponse.statusText}`));
        expect(async () => await getGuide()).rejects.toThrow(`${badResponse.status} ${badResponse.statusText}`);
    });


    test('returns 200 when retrieving searchList', async () => {

        response.data = searchList;
        
        mockedAxios.get.mockResolvedValue(response);
        const searchListResponse = await getShowList();
        expect(searchListResponse[0].show).toEqual(searchList[0].show);
    });

    test.skip('throws an error when unable to retrieve SearchList', async () => {
        mockedAxios.get.mockRejectedValue(Error(`${badResponse.status} ${badResponse.statusText}`));
        await expect(async () => await getGuide()).rejects.toThrow(`${badResponse.status} ${badResponse.statusText}`);
    });

    test('returns updated searchList when searchItem added', async () => {
        response.data = addSearchItemResponse;

        mockedAxios.post.mockResolvedValue(response);
        const res = await addShowToList(tvMazeResult, {}, 'test-token');
        
        expect(res.result).toEqual('success');
        let payload: SearchItemResponses;
        if (res.result === 'success') {
            payload = res.payload;
        }
        expect(payload.message).toContain(addSearchItem.show);
        expect(payload.searchList.length).toBeGreaterThan(searchList.length);
    });

    test.skip('returns error when unable to add searchItem', async () => {
        mockedAxios.post.mockRejectedValue(Error(`${badResponse.status} ${badResponse.statusText}`));

        await expect(async () => await addShowToList(tvMazeResult, {}, 'test-token')).rejects.toMatchObject(badResponse);
    });

    test('returns updated searchList when searchItem deleted', async () => {
        response.data = {
            message: 'Maigret has been removed from the Search List',
            searchList: addSearchItemResponse.searchList.filter(searchItem => searchItem.show !== addSearchItem.show)
        };

        mockedAxios.delete.mockResolvedValue(response);
        const res = await removeShowFromList(addSearchItem.show, 'test-token');
        
        expect(res.result).toEqual('success');
        let payload: SearchItemResponses;
        if (res.result === 'success') {
            payload = res.payload;
        }
        expect(payload.searchList.length).toBeLessThan(addSearchItemResponse.searchList.length);
    });

    test('returns Recorded Shows', async () => {
        response.data = recordedShows;

        mockedAxios.get.mockResolvedValue(response);
        const res = await getRecordedShows();
        
        expect(res.length).toBeGreaterThan(0);
        expect(res[0].show).toEqual(recordedShows[0].show);
        expect(res[0].seasons[0].season_number).toEqual(recordedShows[0].seasons[0].season_number);
        expect(res[0].seasons[0].episodes[0].episode_number).toEqual(recordedShows[0].seasons[0].episodes[0].episode_number);
    });

    test('returns Recorded Show', async () => {
        response.data = recordedShows[1];

        mockedAxios.get.mockResolvedValue(response);
        const res = await getRecordedShow('Maigret');
        
        expect(res.show).toEqual(recordedShows[1].show);
        expect(res.seasons[0].season_number).toEqual(recordedShows[1].seasons[0].season_number);
        expect(res.seasons[0].episodes[0].episode_number).toEqual(recordedShows[1].seasons[0].episodes[0].episode_number);
    });

    test('returns Reminders', async () => {
        response.data = reminders;

        mockedAxios.get.mockResolvedValue(response);
        const res = await getReminders();
        
        expect(res.length).toBeGreaterThan(0);
        expect(res[0].show).toEqual(reminders[0].show);
    });

    test('is able to create a Reminder', async () => {
        const newReminder: Reminder = {
            show: 'Endeavour',
            warning_time: 5,
            reminder_alert: 'Before',
            occasions: 'All'
        };
        response.data = {
            result: 'success',
            reminders: [...reminders, newReminder]
        };

        mockedAxios.post.mockResolvedValue(response);
        const res = await addReminder(newReminder, 'test-token');

        expect(res.result).toEqual('success');
        if (res.result === 'success') {
            let length = res.payload.reminders.length;
            expect(length).toBeGreaterThan(reminders.length);
            expect(res.payload.reminders[length - 1].show).toContain(newReminder.show);
        }
    });

    test('is able to edit a Reminder', async () => {
        const editedReminder: Reminder = {
            show: 'Doctor Who',
            warning_time: 3,
            reminder_alert: 'Before',
            occasions: 'All'
        };
        response.data = {
            result: 'success',
            reminders: reminders.map(reminder => {
                if (reminder.show === 'Doctor Who') {
                    reminder.warning_time = 3;
                }
                return reminder;
            })
        };

        mockedAxios.put.mockResolvedValue(response);
        const res = await editReminder(editedReminder, 'test-token');

        expect(res.result).toEqual('success');
        if (res.result === 'success') {
            expect(res.payload.reminders[0].warning_time).toEqual(editedReminder.warning_time);
        }
    });

    test('is able to delete a Reminder', async () => {
        response.data = {
            result: 'success',
            reminders: reminders.filter(reminder => reminder.show !== 'Maigret')
        };

        mockedAxios.delete.mockResolvedValue(response);
        const res = await deleteReminder('Maigret', 'test-token');

        expect(res.result).toEqual('success');
        if (res.result === 'success') {
            let length = res.payload.reminders.length;
            expect(length).toBeLessThan(reminders.length);
            let maigretFound = false;
            res.payload.reminders.forEach(reminder => {
                if (reminder.show === 'Maigret') {
                    maigretFound = true;
                }
            });
            expect(maigretFound).toBe(false);
        }
    });

    test('is able to retrieve a user', async () => {
        response.data = user;

        mockedAxios.get.mockResolvedValue(response);
        const res = await getUser('Test');

        expect(res.result).toEqual('success');
        if (res.result === 'success') {
            expect(res.payload.username).toEqual(user.username);
        }
    });

    test('is able to register a new user', async () => {
        response.data = newUserRes;

        mockedAxios.post.mockResolvedValue(response);
        const userResponse = await registerNewUser(newUser);

        expect(userResponse.result).toEqual('success');
        if (userResponse.result === 'success') {
            expect(userResponse.payload.message).toEqual(newUserRes.message);
            expect(userResponse.payload.user.username).toEqual(newUserRes.user.username);
            expect(userResponse.payload.user.show_subscriptions).toEqual(newUserRes.user.show_subscriptions);
            expect(userResponse.payload.user.reminder_subscriptions).toEqual(newUserRes.user.reminder_subscriptions);
        }
    });

    test('is able to update password of user', async () => {
        response.data = { ...user, password: 'updated-password' };

        mockedAxios.post.mockResolvedValue(response);
        const userResponse = await changePassword('Test', 'updated-password', 'test-token');

        expect(userResponse.result).toEqual('success');
    });

    test('is able to update password of user', async () => {
        response.data = updateSubscriptionsRes

        mockedAxios.put.mockResolvedValue(response);
        const userResponse = await updateSubscriptions('Test', { show_subscriptions: ['Vera'] }, 'test-token');

        expect(userResponse.result).toEqual('success');
        if (userResponse.result === 'success') {
            expect(userResponse.payload.user.show_subscriptions.length).toBeGreaterThan(user.show_subscriptions.length);
            expect(userResponse.payload.user.show_subscriptions).toContain('Vera');
        }
    });

    test('is able to log a user in', async () => {
        response.data = loginRes;

        mockedAxios.post.mockResolvedValue(response);
        const userResponse = await login({ username: 'Test', password: 'password' });

        expect(userResponse.result).toEqual('success');
        if (userResponse.result === 'success') {
            expect(userResponse.payload.message).toEqual('You have successfully logged in');
            expect(userResponse.payload.user.username).toEqual('Test');
        }
    });

});