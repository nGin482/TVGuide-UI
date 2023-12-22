import React, { useEffect, useState } from "react";
import { Button, Table, TableColumnsType, Tag } from "antd";

import { Guide, GuideShow } from "../utils";
import './TVGuide.css';

const TVGuide = ({ guide }: { guide: Guide }) => {
    const [service, setService] = useState('All');
    const [guideShows, setGuideShows] = useState([...guide.FTA, ...guide.BBC]);

    useEffect(() => {
        if (service === 'FTA') {
            setGuideShows([...guide.FTA]);
        }
        else if (service === 'BBC') {
            setGuideShows(guide.BBC);
        }
        else {
            setGuideShows([...guide.FTA, ...guide.BBC].sort((a, b) => sortServices(a, b)));
        }
    }, [service, guide]);

    const sortServices = (a: GuideShow, b: GuideShow) => {
        if (a.time > b.time) {
            return 1;
        }
        if (a.time < b.time) {
            return -1;
        }
        return 0;
    };

    const tableColumns: TableColumnsType<GuideShow> = [
        {
            title: 'Show',
            dataIndex: 'title',
            key: 'show'
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: 'Channel',
            dataIndex: 'channel',
            key: 'channel'
        },
        {
            title: 'Season Number',
            dataIndex: 'season_number',
            key: 'season_number'
        },
        {
            title: 'Episode Number',
            dataIndex: 'episode_number',
            key: 'episode_number'
        },
        {
            title: 'Episode Title',
            dataIndex: 'episode_title',
            key: 'episode_title'
        },
        {
            title: 'Repeat?',
            dataIndex: 'repeat',
            key: 'repeat',
            render: (repeat: boolean) => repeat && <Tag color="orange">Repeat</Tag>
        }
    ];

    return (
        <div id="tv-guide">
            <div id="service-filter">
                <Button className="service-switch" type="primary" onClick={() => setService('FTA')}>Free to Air</Button>
                <Button className="service-switch" type="primary" onClick={() => setService('BBC')}>BBC Channels</Button>
                <Button className="service-switch" type="primary" onClick={() => setService('All')}>All</Button>
            </div>
            <Table
                className="guide-table"
                columns={tableColumns}
                dataSource={guideShows}
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
    );
};

export default TVGuide;