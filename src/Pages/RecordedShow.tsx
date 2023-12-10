import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Table, TableColumnsType } from 'antd';

import { getRecordedShow } from '../requests/requests';
import { RecordedShowModel } from '../utils';
import BackButton from '../BackButton';
import '../RecordedShowData.css';
import '../EpisodeData.css';

interface RecordedShowParam {
    show: string
};

const RecordedShow = () => {
    const { show } = useParams<RecordedShowParam>();
    const [recordedShow, setRecordedShow] = useState<RecordedShowModel | null>(null);
    const [showEpisodes, setShowEpisodes] = useState(false);
    
    useEffect(() => {
        getRecordedShow(show)
            .then(data => setRecordedShow(data))
            .catch(response => console.log(response));
    }, [show]);

    const episodeColumns: TableColumnsType = [
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
            render: (channels: string[]) => <ul>{channels.map(channel => <li>{channel}</li>)}</ul>
        },
        {
            key: 'air_dates',
            dataIndex: 'air_dates',
            className: 'episode-air-dates',
            title: 'Air Dates',
            render: (air_dates: string[]) => <ul>{air_dates.map(air_date => <li>{air_date}</li>)}</ul>
        }
    ];


    return (
        recordedShow ? (
            <div id={recordedShow.show}>
                <h1>{recordedShow.show}</h1>
                <BackButton route="/shows" text="Recorded Shows"/>

                <Table
                    columns={episodeColumns}
                    dataSource={recordedShow.seasons[0].episodes}
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
            <h1>Waiting for data to be retrieved for {show} ...</h1>
        )
    );    
};


export default RecordedShow;