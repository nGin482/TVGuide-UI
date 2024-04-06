import { useState, useContext } from "react";
import { Card, Image, notification, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import AddShow from "../AddShow";
import { SearchListContext, UserContext } from "../contexts";
import { removeShowFromList } from "../requests/requests";
import '../ShowList.css';

const ShowListPage = () => {
    const { searchList } = useContext(SearchListContext);
    const { currentUser } = useContext(UserContext);

    const deleteShowFromList = async (show: string) => {
        const response = await removeShowFromList(show, currentUser.token);

        if (response.result === 'success') {
            notification.success({
                message: 'Show deleted!',
                description: response.payload.message,
                duration: 5
            });
        }
        else {
            notification.error({
                message: 'Problem deleting show!',
                description: response?.message ||  'You have been logged out. Please login again to delete this show',
                duration: 5
            });
        }
    };


    return (
        <div id="show-list-page">
            <h1>List of Shows</h1>
            <div id="list-of-shows">
                {searchList.map(show => (
                    <Card
                        key={show.show}
                        title={show.show}
                        actions={currentUser ? 
                            [
                                <Tooltip title={`Delete ${show.show}`}>
                                    <DeleteOutlined
                                        data-testid={`delete-${show.show}`}
                                        onClick={() => deleteShowFromList(show.show)}
                                        style={{color: "#f00"}}
                                    />
                                </Tooltip>
                            ] :
                            []
                        }
                        cover={<Image alt={show.show} src={show.image} height={400} preview={false} />}
                        className="search-card"
                    >
                    </Card>
                ))}
            </div>
            <AddShow/>
        </div>
    );
};

export default ShowListPage;