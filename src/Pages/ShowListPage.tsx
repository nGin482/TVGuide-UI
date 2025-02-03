import { useState, useContext } from "react";
import Helmet from "react-helmet";
import { Button, Card, Image, notification, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import AddShow from "../components/AddShow";
import { SearchListContext, UserContext } from "../contexts";
import { removeShowFromList } from "../requests";
import { sessionExpiryMessage } from "../utils";
import image from '../assets/no_image.jpg';
import './styles/ShowList.css';

const ShowListPage = () => {
    const [addingNewShow, setAddingNewShow] = useState(false);
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
                description: response?.message ||  sessionExpiryMessage("delete this show"),
                duration: 5
            });
        }
    };


    return (
        <div id="show-list-page">
            <Helmet>
                <title>Search List | TVGuide</title>
            </Helmet>
            <h1>List of Shows</h1>
            {addingNewShow ? 
                <AddShow openModal={addingNewShow} setOpenModal={setAddingNewShow} /> :
                currentUser && <Button onClick={() => setAddingNewShow(true)}>Add Show</Button>
            }
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
                        cover={
                            <Image
                                alt={show.show}
                                src={show.image}
                                fallback={image}
                                height={400}
                                width="99%"
                                style={{ marginLeft: '1px' }}
                                preview={false}
                            />
                        }
                        className="search-card"
                    >
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ShowListPage;