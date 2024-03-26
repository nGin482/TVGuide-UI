import { CSSProperties, Dispatch, JSX, SetStateAction, useEffect, useState, useContext } from "react";
import { Carousel, Checkbox, Input, Form, Modal, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import classNames from "classnames";

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
    const [showSelected, setShowSelected] = useState<ShowSearchResult>(null);
    const [result, setResult] = useState('');
    const [showToAdd, setShowToAdd] = useState('');
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        setState('initial');
        setSearchResults([]);
    }, [searchTerm]);

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
        setState('searching');
    };

    const handleConfirm = () => {
        if (state === 'initial') {
            searchNewShowHandle();
        }
        else if (state === 'searching') {
            setState('selected');
        }
        else if (state === 'selected') {
            // addShowSubmission();
            console.log(showSelected)
        }
        else {
            setOpenModal(false);
        }
    };

    const okText = () => {
        switch (state) {
            case 'initial':
                return 'Search';
            case 'searching':
                return 'Next';
            case 'selected':
                return 'Add Show';
            default:
                return 'Close';
        }
    };

    const contentStyle: CSSProperties = {
        height: '160px',
        textAlign: 'center',
        width: '50%'
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

    useEffect(() => {
        console.log(showSelected)
    }, [showSelected])

    return (
        <Modal
            open={openModal}
            title="Add a new Search Item"
            onOk={handleConfirm}
            okText={okText()}
            okButtonProps={{ disabled: state === 'searching' && !showSelected }}
            onCancel={() => setOpenModal(false)}
            width={searchResults.length > 0 ? 1000 : 520}
        >
            <Form>
                <Form.Item
                    name="searchTerm"
                    label="New Show"
                >
                    <Input onChange={event => setSearchTerm(event.currentTarget.value)} />
                </Form.Item>
                {state === 'searching' ? (
                    <Carousel dots={false} arrows nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
                        {searchResults.map(result => (
                            <div
                                key={result.show.id}
                                onClick={() => setShowSelected(result)}
                                style={contentStyle}
                                className={classNames(
                                    'result',
                                    {'result-selected': showSelected && showSelected.show.id === result.show.id}
                                )}
                            >
                                <h2>{result.show.name}</h2>
                                <img src={result.show.image.medium} style={{ margin: '0 auto'}} />
                                <p dangerouslySetInnerHTML={{ __html: result.show.summary }} />
                                <blockquote>Premiered: {result.show.premiered}</blockquote>
                                <blockquote>Status: {result.show.status}</blockquote>
                            </div>
                        ))}
                    </Carousel>
                ) : state === 'selected' && (
                    <>
                        <Checkbox value="exact_search">Exact Title Search</Checkbox>
                        <Select />
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default AddShow;