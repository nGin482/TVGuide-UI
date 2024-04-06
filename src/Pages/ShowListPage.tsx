import { useState, useContext } from "react";
import { Button, Card, Image, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import AddShow from "../components/AddShow";
import { SearchListContext, UserContext } from "../contexts";
import { removeShowFromList } from "../requests/requests";
import '../ShowList.css';

const ShowListPage = () => {
    const [result, setResult] = useState('');
    const [addingNewShow, setAddingNewShow] = useState(false);
    const { searchList } = useContext(SearchListContext);
    const { currentUser } = useContext(UserContext);

    const deleteShowFromList = async (show: string) => {
        const response = await removeShowFromList(show, currentUser.token);

        response.result === 'success' ? setResult(response.payload.message) : setResult(response?.msg ? response.msg : response.message);
    };


    return (
        <div id="show-list-page">
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
                        actions={[
                            <Tooltip title={`Delete ${show.show}`}>
                                <DeleteOutlined
                                    data-testid={`delete-${show.show}`}
                                    onClick={() => deleteShowFromList(show.show)}
                                    style={{color: "#f00"}}
                                />
                            </Tooltip>
                        ]}
                        cover={<Image alt={show.show} src={show.image} height={400} preview={false} />}
                        className="search-card"
                    >
                    </Card>
                ))}
                <blockquote data-testid="delete-result">{result}</blockquote>
            </div>
        </div>
    );
};

export default ShowListPage;