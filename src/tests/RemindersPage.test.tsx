import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import RemindersPage from "../Pages/RemindersPage";
import { recordedShows } from "./test_data";
import { RecordedShowsContext, RemindersContext, UserContext } from "../contexts";
import { CurrentUser, Reminder } from "../utils/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Reminders Page', () => {
    const reminders: Reminder[] = [
        {
            show: 'Doctor Who',
            reminder_alert: 'Before',
            warning_time: 3,
            occasions: 'All'
        },
        {
            show: 'Endeavour',
            reminder_alert: 'Before',
            warning_time: 5,
            occasions: 'All'
        },
        {
            show: 'Maigret',
            reminder_alert: 'Before',
            warning_time: 3,
            occasions: 'All'
        }
    ];

    const emptyReminders: Reminder[] = [];

    const user: CurrentUser = {
        username: 'Test',
        show_subscriptions: [],
        reminder_subscriptions: [],
        token: 'testToken',
        role: 'Standard'
    };

    const RemindersComp = () => (
        <RecordedShowsContext.Provider value={{ recordedShows: recordedShows, setRecordedShows: () => undefined }}>
            <RemindersContext.Provider value={{ reminders: reminders, setReminders: () => undefined }}>
                <UserContext.Provider value={{ currentUser: user, setUser: () => undefined }}>
                    <RemindersPage />
                </UserContext.Provider>
            </RemindersContext.Provider>
        </RecordedShowsContext.Provider>
        
    )

    test('page renders all reminders', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: reminders });
            render(<RemindersComp />);
        });

        expect(screen.queryByText(/Doctor Who/i)).toBeInTheDocument();
        expect(screen.queryByText(/Endeavour/i)).toBeInTheDocument();
        expect(screen.queryByText(/Maigret/i)).toBeInTheDocument();
    });

    test('renders add reminder modal', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: reminders });
            render(<RemindersComp />);
        });

        const addReminderButton = screen.queryByTestId(/add-reminder-button/i);
        expect(addReminderButton).toBeInTheDocument();
        fireEvent.click(addReminderButton);

        expect(screen.queryByText(/Add a new Reminder/i)).toBeInTheDocument();
    });

    test('renders edit reminder modal', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: reminders });
            render(<RemindersComp />);
        });

        const editReminderButton = screen.queryByTestId(/edit-Maigret/i);
        expect(editReminderButton).toBeInTheDocument();
        fireEvent.click(editReminderButton);

        expect(screen.queryByText(/Edit the reminder for Maigret/i)).toBeInTheDocument();
    });

    test('renders modal if an error occurs', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: reminders });
            render(<RemindersComp />);
        });

        const data = {
            result: 'error',
            message: 'Could not delete Maigret'
        };
        
        await act(async () => {
            mockedAxios.delete.mockRejectedValue({ response: { data } });
            const deleteMaigret = screen.getByTestId(/delete-Maigret/i);
            fireEvent.click(deleteMaigret);
        });

        const deleteResult = screen.queryByText(/Could not delete Maigret/i);
        await waitFor(() => expect(deleteResult).toBeInTheDocument());
    });
});