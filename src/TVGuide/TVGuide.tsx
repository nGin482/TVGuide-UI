import React, { useEffect, useState } from "react";
import { Button, Table, TableColumnsType, Tag } from "antd";
// import { useHistory } from "react-router";

import Event from "../Event";
import { showStringForGuide, Guide, GuideShow } from "../utils";
import './TVGuide.css';

const TVGuide = ({ guide }: { guide: Guide }) => {
    const [service, setService] = useState('All');
    const [openModal, setOpenModal] = useState(false);
    const [eventForModal, setEventForModal] = useState('');
    const [guideShows, setGuideShows] = useState(guide.FTA.concat(guide.BBC));
    // const history = useHistory()

    useEffect(() => {
        if (service === 'FTA') {
            setGuideShows(guide.FTA);
        }
        if (service === 'BBC') {
            setGuideShows(guide.BBC);
        }
        else {
            setGuideShows(guide.FTA.concat(guide.BBC));
        }
    }, [service]);

    const selectEvent = (event: string) => {
        setOpenModal(true);
        setEventForModal(event);
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
            <div id="guide-content">
                <Table
                    columns={tableColumns}
                    dataSource={guideShows}
                    bordered={true}
                    pagination={
                        {
                            position: ['bottomCenter'],
                            pageSize: 50,
                            hideOnSinglePage: true
                        }
                    } />

                {/* <Event openModal={openModal} setOpenModal={setOpenModal} event={eventForModal}/> */}
            </div>
        </div>
    );
};

export default TVGuide;