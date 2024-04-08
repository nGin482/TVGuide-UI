import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import ShowListPage from "../Pages/ShowListPage";
import { UserContext } from "../contexts/UserContext";
import { CurrentUser, SearchItem } from "../utils/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('test SearchList page', () => {
    const searchList: SearchItem[] = [
        {
            show: 'Maigret',
            image: 'http://images.com/maigret',
            conditions: {

            },
            searchActive: true
        },
        {
            show: 'Doctor Who',
            image: 'http://images.com/doctor-who',
            conditions: {

            },
            searchActive: true
        },
        {
            show: 'Vera',
            image: 'http://images.com/doctor-who',
            conditions: {

            },
            searchActive: true
        }
    ];

    const user: CurrentUser = {
        username: 'Test',
        show_subscriptions: [],
        reminder_subscriptions: [],
        token: 'testToken',
        role: 'Standard'
    };

    const SearchList = () => (
        <UserContext.Provider value={{ currentUser: user, setUser: () => null }}>
            <ShowListPage />
        </UserContext.Provider>
    );

    
    test('renders all search items', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: searchList });
            render(<SearchList />);
        });
        const maigret = screen.queryByText(/Maigret/i);
        const doctorwho = screen.queryByText(/Doctor Who/i);
        expect(maigret).toBeInTheDocument();
        expect(doctorwho).toBeInTheDocument();
    });

    test('renders delete icon', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: searchList });
            render(<SearchList />);
        });

        const deleteMaigretIcon = screen.queryByTestId(/delete-maigret/i);
        expect(deleteMaigretIcon).toBeInTheDocument();
    });

    test('clicking delete icon removes show from list', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: searchList });
            render(<SearchList />);
        });

        const deleteVeraIcon = screen.queryByTestId(/delete-vera/i);
        expect(deleteVeraIcon).toBeInTheDocument();

        const data = {
            message: 'Vera has been deleted'
        };
        await act(async () => {
            mockedAxios.delete.mockResolvedValue({ data });
            fireEvent.click(deleteVeraIcon);
        });

        await waitFor(() => expect(screen.queryByTestId('delete-result')).toBeInTheDocument());
    });
});