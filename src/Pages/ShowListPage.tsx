import React, { useState, useEffect, useContext } from "react";
import { Card, Image, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import AddShow from "../AddShow";
import { UserContext } from "../contexts/UserContext";
import { getShowList, removeShowFromList } from "../requests/requests";
import { SearchItem } from "../utils";
import '../ShowList.css';

const ShowListPage = () => {
    const [showList, setShowList] = useState<SearchItem[]>([]);
    const [result, setResult] = useState('');
    const { user } = useContext(UserContext)

    useEffect(() => {
        getShowList().then(showList => setShowList(showList));
    }, []);

    const deleteShowFromList = async (show: string) => {
        const response = await removeShowFromList(show, user.token);

        response.result === 'success' ? setResult(response.message) : setResult(response.payload.message);
    };


    return (
        <div id="show-list-page">
            <h1>List of Shows</h1>
            <div id="list-of-shows">
                {showList.map(show => (
                    <Card
                        title={show.show}
                        actions={[
                            <Tooltip title={`Delete ${show.show}`}>
                                <DeleteOutlined onClick={() => deleteShowFromList(show.show)} style={{color: "#f00"}} />
                            </Tooltip>
                        ]}
                        cover={<Image alt={show.show} src={show.image} height={400} preview={false} />}
                        className="search-card"
                    >
                    </Card>
                ))}
                <blockquote>{result}</blockquote>
            </div>
            <AddShow/>
        </div>
    );
};

export default ShowListPage;