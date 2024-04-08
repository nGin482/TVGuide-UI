import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import { RecordedShowModel } from "../utils/types";
import RecordedShow from "../Pages/RecordedShow";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('Viewing the details about a Recorded Show', () => {
    const recordedShow: RecordedShowModel = {
        show: 'Doctor Who',
        seasons: [
            {
                season_number: 1,
                episodes: [
                    {
                        episode_number: 1,
                        episode_title: 'Rose',
                        alternative_titles: [],
                        summary: '',
                        channels: [
                            'ABC1',
                            'ABCHD',
                            'ABC2'
                        ],
                        air_dates: [
                            '10/4/2024',
                            '11/4/2024'
                        ]
                    }
                ]
            },
            {
                season_number: 2,
                episodes: [
                    {
                        episode_number: 0,
                        episode_title: 'A Christmas Invasion',
                        alternative_titles: [],
                        summary: '',
                        channels: [
                            'ABC1',
                            'ABCHD',
                            'ABC2'
                        ],
                        air_dates: [
                            '11/4/2024',
                            '12/4/2024'
                        ]
                    }
                ]
            }
        ],
        tvmaze_id: '1234'
    };

    const RecordedShowPage = () => (
        <MemoryRouter initialEntries={[`/shows/Doctor Who`]}>
            <Switch>
                <Route path="/shows/:show">
                    <RecordedShow />
                </Route>
            </Switch>
        </MemoryRouter>
    );

    test('renders table with doctor who data', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: recordedShow });
            render(<RecordedShowPage />);
        });
        
        const header = screen.queryAllByText(/Doctor Who/i);
        expect(header[0]).toBeInTheDocument();

        const table = screen.queryByTestId(/doctor who-table/i);
        expect(table).toBeInTheDocument();
    });

    test('renders buttons to change seasons', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: recordedShow });
            render(<RecordedShowPage />);
        });
        
        const seasonButtons = screen.queryAllByTestId(/season-/i);
        expect(seasonButtons[0]).toHaveTextContent('Season 1');
        expect(seasonButtons[1]).toHaveTextContent('Season 2');
    });

    test('clicking season button to change episodes in table', async () => {
        await act(async () => {
            mockedAxios.get.mockResolvedValue({ data: recordedShow });
            render(<RecordedShowPage />);
        });
        
        const seasonTwoButton = screen.queryByTestId(/season-2/i);
        fireEvent.click(seasonTwoButton);
        
        const table = screen.queryByTestId(/doctor who-table/i);
        expect(table).toHaveTextContent(/A Christmas Invasion/i);
        expect(table).not.toHaveTextContent(/Rose/i);
    });
});