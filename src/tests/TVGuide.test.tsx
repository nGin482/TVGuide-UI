import { fireEvent, render, screen } from '@testing-library/react';

import TVGuide from '../components/TVGuide';
import { Guide, CurrentUser } from '../utils';

describe('test TVGuide component', () => {
    const guide: Guide = {
        FTA: [
            {
                title: 'Maigret',
                time: '20:30',
                channel: 'ABC1',
                season_number: '2',
                episode_number: 1,
                episode_title: "Maigret's Dead Man",
                repeat: true,
                event: 'Maigret has aired today'
            },
            {
                title: 'Vera',
                time: '13:00',
                channel: 'ABC1',
                season_number: '7',
                episode_number: 3,
                episode_title: 'Broken Promise',
                repeat: true,
                event: 'Vera has aired today'
            }
        ],
        BBC: [
            {
                title: 'Death in Paradise',
                time: '19:30',
                channel: 'BBC First',
                season_number: '1',
                episode_number: 1,
                episode_title: 'Arriving in Paradise',
                repeat: true,
                event: 'Death in Paradise has aired today'
            },
            {
                title: 'Lewis',
                time: '15:00',
                channel: 'BBC UKTV',
                season_number: '2',
                episode_number: 3,
                episode_title: 'Life Born of Fire',
                repeat: true,
                event: 'Lewis has aired today'
            }
        ]
    };

    const user: CurrentUser = {
        username: 'test',
        token: 'testToken',
        show_subscriptions: [
            'Vera',
            'Lewis'
        ],
        reminder_subscriptions: [

        ],
        role: 'Standard'
    }

    test('renders service buttons', () => {
        render(<TVGuide guide={guide} />);
        const ftaButton = screen.getByText(/Free to Air/i);
        const bbcButton = screen.getByText(/BBC Channels/i);
        const allButton = screen.getByText(/All/i);
        expect(ftaButton).toBeInTheDocument();
        expect(bbcButton).toBeInTheDocument();
        expect(allButton).toBeInTheDocument();
    });

    test('fta button only shows FTA guide', () => {
        render(<TVGuide guide={guide} />);
        const ftaButton = screen.getByText(/Free to Air/i);
        
        fireEvent.click(ftaButton);

        const maigret = screen.getByText(/^Maigret$/i);
        const deathInParadise = screen.queryByText(/Death in Paradise/i);
        expect(maigret).toBeInTheDocument();
        expect(deathInParadise).not.toBeInTheDocument();
    });

    test('bbc button only shows BBC guide', () => {
        render(<TVGuide guide={guide} />);
        const bbcButton = screen.getByText(/BBC Channels/i);
        
        fireEvent.click(bbcButton);

        const maigret = screen.queryByText(/^Maigret$/i);
        const deathInParadise = screen.queryByText(/Death in Paradise/i);
        expect(maigret).not.toBeInTheDocument();
        expect(deathInParadise).toBeInTheDocument();
    });

    test('all button shows FTA shows and BBC shows', () => {
        render(<TVGuide guide={guide} />);
        const allButton = screen.getByText(/All/i);

        fireEvent.click(allButton);

        const maigret = screen.queryByText(/^Maigret$/i);
        const deathInParadise = screen.queryByText(/Death in Paradise/i);
        expect(maigret).toBeInTheDocument();
        expect(deathInParadise).toBeInTheDocument();
    });

    test('TVGuide only renders shows user has sbscribed to', () => {
        render(<TVGuide guide={guide} user={user} />);

        const maigret = screen.queryByText(/Maigret/i);
        const deathInParadise = screen.queryByText(/Death in Paradise/i);
        const vera = screen.queryByText(/Vera/i);
        const lewis = screen.queryByText(/Lewis/i);

        expect(maigret).not.toBeInTheDocument();
        expect(deathInParadise).not.toBeInTheDocument();
        expect(vera).toBeInTheDocument();
        expect(lewis).toBeInTheDocument();
    })
});
