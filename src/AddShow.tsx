import { Dispatch, SetStateAction, useState, useContext } from "react";
import { Input, Form, Modal } from "antd";

import { UserContext } from "./contexts/UserContext";
import { addShowToList } from "./requests/requests";
import './AddShow.css';

interface AddShowProps {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
};

const AddShow = (props: AddShowProps) => {
    const { openModal, setOpenModal } = props;
    const [showToAdd, setShowToAdd] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState('');
    const { currentUser } = useContext(UserContext);

    const addShowSubmission = async () => {
        const response = await addShowToList(showToAdd, currentUser.token);
        if (response.result === 'success') {
            setResult(response.payload.message);
            setShowToAdd('');
            setResult('');
        }
        else {
            setResult(response.message);
        }
    };

    return (
        <Modal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            title="Add a new Search Item"
        >
            <Form>
                <Form.Item
                    name="searchTerm"
                    label="New Show"
                >
                    <Input onChange={event => setSearchTerm(event.currentTarget.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddShow;