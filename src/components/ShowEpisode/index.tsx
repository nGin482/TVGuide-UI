import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Alert, Button, Table, TableColumnsType, Tag } from 'antd';
import dayjs from 'dayjs';

import { getSeasons } from '../../utils';
import { ShowEpisode } from '../../utils/types';
import "./ShowEpisode.css";

interface ShowProps {
    episodes: ShowEpisode[]
    showName: string
};

const ShowEpisodes = ({ episodes, showName }: ShowProps) => {
    const [season, setSeason] = useState(1);

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
                <Tag
                    key={`tag-${index}-${channel}`}
                    color="geekblue"
                    className="episode-channel"
                >
                    {channel}
                </Tag>
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
        episodes ? (
            <div className="episodes">
                <Helmet>
                    <title>{showName} Episodes | TVGuide</title>
                </Helmet>

                <h3>Episodes</h3>
                {getSeasons(episodes).map(seasonNumber => 
                    <Button
                        className={seasonNumber === season ? "change-season-active" : "change-season" }
                        onClick={() => setSeason(seasonNumber)}
                        key={seasonNumber}
                        data-testid={`season-${seasonNumber}`}
                    >
                        Season {seasonNumber}
                    </Button>
                )}
                <Table
                    data-testid={`${showName}-table`}
                    key={`${showName}-table`}
                    rowKey={record => record.episode_title}
                    columns={episodeColumns}
                    dataSource={episodes.filter(episode => episode.season_number === season)}
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
                <Alert type="error" message="A problem occurred retrieving the episodes for this show" />
            </>
        )
    );    
};


export { ShowEpisodes };