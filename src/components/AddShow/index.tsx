import { CSSProperties, Dispatch, JSX, SetStateAction, useState, useContext, FC } from "react";
import { Carousel, Input, Form, Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { UserContext } from "../../contexts/UserContext";
import { addShowToList } from "../../requests/requests";
import { searchNewShow } from "../../requests/tvmaze";
import { ShowSearchResult } from "../../utils/types/index";
import './AddShow.css';

interface AddShowProps {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
};

interface SlickArrowProps {
    className: string
    currentSlide: number
    onClick: () => {}
    style: {}
    children: JSX.Element
};

const AddShow = (props: AddShowProps) => {
    const { openModal, setOpenModal } = props;
    const [state, setState] = useState('initial');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ShowSearchResult[]>([]);
    const [result, setResult] = useState('');
    const [showToAdd, setShowToAdd] = useState('');
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

    const searchNewShowHandle = async () => {
        console.log(searchTerm)
        const searchShowResults = await searchNewShow(searchTerm);
        console.log(searchShowResults)
        setSearchResults(searchShowResults);
    };

    const contentStyle: CSSProperties = {
        height: '160px',
        background: "#364d79",
        textAlign: 'center'
    };

    const ArrowComponent = (props: SlickArrowProps) => {
        const { className, style, onClick, children } = props;
        
        return (
            <div
                className={className}
                style={{
                    ...style,
                    color: 'black',
                    fontSize: '15px',
                    lineHeight: '1.5715'
                }}
                onClick={onClick}
            >
                {children}
            </div>
        );
    };

    const PrevArrow = (props) => (
        <ArrowComponent {...props}>
            <LeftOutlined />
        </ArrowComponent>
    );

    const NextArrow = (props) => (
        <ArrowComponent {...props}>
            <RightOutlined />
        </ArrowComponent>
    );

    return (
        <Modal
            open={openModal}
            title="Add a new Search Item"
            onOk={state === 'initial' ? () => searchNewShowHandle() : () => setOpenModal(false)}
            okText={state === 'initial' ? 'Search' : 'Close'}
            onCancel={() => setOpenModal(false)}
        >
            <Form>
                <Form.Item
                    name="searchTerm"
                    label="New Show"
                >
                    <Input onChange={event => setSearchTerm(event.currentTarget.value)} />
                </Form.Item>
                <Carousel dots={false} arrows nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
                    {searchResults.map(result => (
                        <div key={result.show.id} style={contentStyle}>
                            <h2>{result.show.name}</h2>
                            <img src={result.show.image.medium} style={{ margin: '0 auto'}} />
                            <p dangerouslySetInnerHTML={{ __html: result.show.summary }} />
                            <blockquote>Premiered: {result.show.premiered}</blockquote>
                            <blockquote>Status: {result.show.status}</blockquote>
                        </div>
                    ))}
                </Carousel>
            </Form>
        </Modal>
    );
};

export default AddShow;