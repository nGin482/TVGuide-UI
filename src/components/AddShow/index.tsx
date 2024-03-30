import { Dispatch, SetStateAction, useEffect, useContext, useState } from "react";
import { Alert, Carousel, Checkbox, Form, Input, Modal, notification, Select, Tag } from "antd";
import classNames from "classnames";

import ShowStatusTag from "./ShowStatusTag";
import { PrevArrow, NextArrow } from "./ArrowComponents";
import { UserContext } from "../../contexts/UserContext";
import { addShowToList } from "../../requests/requests";
import { searchNewShow, getShowSeasons } from "../../requests/tvmaze";
import { SeasonSearch, ShowSearchResult } from "../../utils/types/index";
import './AddShow.scss';

interface AddShowProps {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
};
interface FormValues {
    searchTerm: string
    exact_search: boolean
    seasons: string[]
};

const AddShow = (props: AddShowProps) => {
    const { openModal, setOpenModal } = props;
    
    const [state, setState] = useState('initial');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ShowSearchResult[]>([]);
    const [showSelected, setShowSelected] = useState<ShowSearchResult>(null);
    const [showSelectedIndex, setShowSelectedIndex] = useState<number>(null);
    const [showSeasons, setShowSeasons] = useState<SeasonSearch[]>([]);
    const [result, setResult] = useState('');
    const [index, setIndex] = useState(0);
    const { currentUser } = useContext(UserContext);

    const [form] = Form.useForm<FormValues>();

    useEffect(() => {
        setState('initial');
        setSearchResults([]);
    }, [searchTerm]);

    useEffect(() => {
        console.log(showSelected)
        if (showSelected) {
            getShowSeasons(showSelected.show.id).then(seasons => {
                console.log(seasons)
                setShowSeasons(seasons);
            });
        }
    }, [showSelected]);

    const addShowSubmission = async () => {
        const response = await addShowToList(showSelected.show.name, showSelected.show.image.original, showSelected.show.id, { } , currentUser.token);
        if (response.result === 'success') {
            setResult(response.payload.message);
            setState('success');
            setOpenModal(false);
            notification.success({ message: 'Success!', description: response.payload.message, duration: 5 });
        }
        else {
            setResult(response?.message || 'You have been logged out. Please login again to add this show');
            setState('error');
        }
    };

    const searchNewShowHandle = async () => {
        console.log(searchTerm)
        const searchShowResults = await searchNewShow(searchTerm);
        console.log(searchShowResults)
        setSearchResults(searchShowResults);
        setState('searching');
        if (searchShowResults.length > 0) {
            setIndex(1);
        }
    };

    const handleConfirm = () => {
        if (state === 'initial') {
            searchNewShowHandle();
        }
        else if (state === 'searching') {
            setState('selected');
        }
        else if (state === 'selected') {
            addShowSubmission();
            console.log(showSelected)
            console.log(form.getFieldsValue())
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
            <Form
                form={form}
            >
                <Form.Item
                    name="searchTerm"
                    label="New Show"
                >
                    <Input onChange={event => setSearchTerm(event.currentTarget.value)} />
                </Form.Item>
                {state === 'searching' ? (
                    <>
                        {searchResults && index && <span>Viewing: {index} of {searchResults.length}</span>}
                        {showSelected && showSelectedIndex && (
                            <>
                                <br/>
                                <span>Selected {showSelected.show.name} - Item {showSelectedIndex}</span>
                            </>
                        )}
                        <Carousel dots={false} arrows nextArrow={<NextArrow />} prevArrow={<PrevArrow />} afterChange={change => setIndex(change + 1)}>
                            {searchResults.map(result => (
                                <div
                                    key={result.show.id}
                                    onClick={() => {
                                        if (showSelected && result.show.id === showSelected.show.id) {
                                            setShowSelected(null);
                                        }
                                        else {
                                            setShowSelected(result);
                                            setShowSelectedIndex(index);
                                        }
                                    }}
                                    className={classNames(
                                        'result',
                                        {'result-selected': showSelected && showSelected.show.id === result.show.id}
                                    )}
                                >
                                    <h2>{result.show.name}</h2>
                                    <img src={result.show.image.medium} style={{ margin: '0 auto'}} />
                                    <p dangerouslySetInnerHTML={{ __html: result.show.summary }} />
                                    <blockquote>Premiered: <Tag color="processing">{result.show.premiered}</Tag></blockquote>
                                    <blockquote>Status: <ShowStatusTag status={result.show.status} /></blockquote>
                                </div>
                            ))}
                        </Carousel>
                    </>
                ) : state === 'selected' && (
                    <>
                        <Form.Item
                            name="exact_search"
                        >
                            <Checkbox name="exact_search">Exact Title Search</Checkbox>
                        </Form.Item>
                        <Form.Item
                            name="seasons"
                            label="Select the seasons desired"
                        >
                            <Select
                                options={showSeasons.map(season => ({ label: `Season ${season.number}`, value: season.number }))}
                            />
                        </Form.Item>
                    </>
                )}
                {result && <Alert type="error" message={result} />}
            </Form>
        </Modal>
    );
};

export default AddShow;