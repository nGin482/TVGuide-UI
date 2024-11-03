import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router";
import { Helmet } from 'react-helmet';
import { Alert, Button, Table, TableColumnsType, Tag } from 'antd';
import dayjs from 'dayjs';

import BackButton from '../BackButton';
import { RecordedShowsContext } from '../../contexts';
import { getSeasons } from '../../utils';
import { ShowData, ShowEpisode } from '../../utils/types';

interface ShowParam {
    show: string
};

const ShowEpisodes = () => {
    const { show } = useParams<ShowParam>();
    const [showData, setshowData] = useState<ShowData | null>(null);
    const [season, setSeason] = useState(1);

    const { shows } = useContext(RecordedShowsContext);
    
    useEffect(() => {
        const showDetail = shows.find(showData => showData.show_name === show);
        setshowData(showDetail);
    }, [show, shows]);

    const changeSeason = (seasonNumber: number) => {
        setSeason(seasonNumber)
    };

    const episodeColumns: TableColumnsType<ShowEpisode> = [
        {
            key: 'season_number',
            dataIndex: 'season_number',
            title: 'Season Number'
        },
        {
            key: 'episode_number',
            dataIndex: 'episode_number',
            title: 'Episode Number'
        },
        {
            key: 'episode_title',
            dataIndex: 'episode_title',
            title: 'Episode Title'
        },
        {
            key: 'alternative_titles',
            dataIndex: 'alternative_titles',
            title: 'Alternative Titles'
        },
        {
            key: 'summary',
            dataIndex: 'summary',
            title: 'Summary',
            render: (summary: string) => <div dangerouslySetInnerHTML={{__html: summary}} />
        },
        {
            key: 'channels',
            dataIndex: 'channels',
            className: 'episode-channels',
            title: 'Channels',
            render: (channels: string[]) => channels.map((channel, index) =>
                <Tag key={`tag-${index}-${channel}`} color="geekblue" className="episode-channel">{channel}</Tag>
            )
        },
        {
            key: 'air_dates',
            dataIndex: 'air_dates',
            className: 'episode-air-dates',
            title: 'Air Dates',
            render: (air_dates: Date[]) => air_dates.map((air_date, index) =>
                <Tag
                    key={`tag-${index}-${air_date}`}
                    color="geekblue"
                    className="episode-channel"
                >
                    {dayjs(air_date).format("DD/MM/YYYY")}
                </Tag>
            )
        }
    ];

    return (
        showData ? (
            <div id={showData.show_name}>
                <Helmet>
                    <title>{showData.show_name} Details | TVGuide</title>
                </Helmet>
                <h1>{showData.show_name}</h1>
                <BackButton route="/shows" text="Recorded Shows"/>

                {getSeasons(showData.show_episodes).map(seasonNumber => 
                    <Button
                        className="change-season"
                        onClick={() => changeSeason(seasonNumber)}
                        key={seasonNumber}
                        data-testid={`season-${seasonNumber}`}
                    >
                        Season {seasonNumber}
                    </Button>
                )}
                <Table
                    data-testid={`${showData.show_name}-table`}
                    key={`${showData.show_name}-table`}
                    rowKey={record => record.episode_title}
                    columns={episodeColumns}
                    dataSource={showData.show_episodes.filter(showEpisode => showEpisode.season_number === season)}
                    className='season-table'
                    bordered={true}
                    pagination={
                        {
                            position: ['bottomCenter'],
                            pageSize: 50,
                            hideOnSinglePage: true
                        }
                    }
                />
            </div>
        )
        : (
            <>
                <h1>{show}</h1>
                <Alert type="error" message="A problem occurred retrieving the data for this show" />
            </>
        )
    );    
};


export { ShowEpisodes };