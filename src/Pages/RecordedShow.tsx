import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Alert, Button, Table, TableColumnsType, Tag } from 'antd';

import { getRecordedShow } from '../requests';
import { Episode, RecordedShowModel } from '../utils/types';
import BackButton from '../components/BackButton';

interface RecordedShowParam {
    show: string
};

const RecordedShow = () => {
    const { show } = useParams<RecordedShowParam>();
    const [recordedShow, setRecordedShow] = useState<RecordedShowModel | null>(null);
    const [season, setSeason] = useState(1);
    
    useEffect(() => {
        getRecordedShow(show)
            .then(data => setRecordedShow(data))
            .catch(response => console.log(response));
    }, [show]);

    const changeSeasons = (season_number: number | string) => {
        if (typeof season_number === 'string') {
            const index = recordedShow.seasons.findIndex(season => typeof season.season_number === 'string');
            setSeason(index + 1);
        }
        else {
            setSeason(season_number);
        }
    };

    const episodeColumns: TableColumnsType<Episode> = [
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
            render: (air_dates: string[]) => air_dates.map((air_date, index) =>
                <Tag key={`tag-${index}-${air_date}`} color="geekblue" className="episode-channel">{air_date}</Tag>
            )
        }
    ];

    return (
        recordedShow ? (
            <div id={recordedShow.show}>
                <h1>{recordedShow.show}</h1>
                <BackButton route="/shows" text="Recorded Shows"/>

                {recordedShow.seasons.map(season => 
                    <Button
                        className="change-season"
                        onClick={() => changeSeasons(season.season_number)}
                        key={season.season_number}
                        data-testid={`season-${season.season_number}`}
                    >
                        Season {season.season_number}
                    </Button>
                )}
                <Table
                    data-testid={`${recordedShow.show}-table`}
                    key={`${recordedShow.show}-table`}
                    rowKey={record => record.episode_title}
                    columns={episodeColumns}
                    dataSource={recordedShow.seasons[season-1].episodes}
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
                <Alert type="info" message={`Retrieving data for ${show} ...`} className="show-loading" />
            </>
        )
    );    
};


export default RecordedShow;