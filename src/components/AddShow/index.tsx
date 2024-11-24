import { useEffect, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
    Alert,
    App,
    Carousel,
    Checkbox,
    Form,
    Input,
    Modal,
    Radio,
    Space,
    Select,
    Tag
} from "antd";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";

import ShowStatusTag from "./ShowStatusTag";
import { PrevArrow, NextArrow } from "./ArrowComponents";
import { RecordedShowsContext, UserContext } from "../../contexts";
import { addNewShow, getShowSeasons, searchNewShow } from "../../requests";
import { ErrorResponse, NewShowPayload, TVMazeSeason, TVMazeShow } from "../../utils/types";
import './AddShow.scss';

interface AddShowProps {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
};
interface FormValues {
    searchTerm: string
    exactSearch: boolean
    seasons: number[]
    seasonChoice: "all" | "some"
};
type FORM_STATES = 'initial' | 'searching' | 'selected' | 'success' | 'error';

const AddShow = ({ openModal, setOpenModal }: AddShowProps) => {
    
    const [state, setState] = useState<FORM_STATES>('initial');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<TVMazeShow[]>([]);
    const [showSelected, setShowSelected] = useState<TVMazeShow>(null);
    const [showSelectedIndex, setShowSelectedIndex] = useState<number>(null);
    const [seasonChoice, setSeasonChoice] = useState<"all" | "some">();
    const [showSeasons, setShowSeasons] = useState<TVMazeSeason[]>([]);
    const [error, setError] = useState('');
    const [index, setIndex] = useState(0);
    
    const { setShows } = useContext(RecordedShowsContext);
    const { currentUser } = useContext(UserContext);
    const { notification } = App.useApp();

    const [form] = Form.useForm<FormValues>();

    useEffect(() => {
        setState('initial');
        setSearchResults([]);
        setError('');
        setShowSelected(null);
        setShowSelectedIndex(null);
        setShowSeasons([]);
    }, [searchTerm]);

    useEffect(() => {
        if (showSelected) {
            getShowSeasons(showSelected.show.id).then(seasons => setShowSeasons(seasons));
        }
    }, [showSelected]);

    const addShowSubmission = async () => {
        form.validateFields();
        if (!form.getFieldsValue().exactSearch) {
            form.setFieldValue('exact_search', false);
        }
        
        const formValues = form.getFieldsValue();
        let seasons = formValues?.seasons;
        if (formValues.seasonChoice === "all") {
            seasons = showSeasons.map(season => season.number);
        }
        const searchCriteria: NewShowPayload['conditions'] = {
            exact_title_match: formValues?.exactSearch || false,
            min_season_number: Math.min(...seasons),
            max_season_number: Math.max(...seasons)
        };
        if (formValues.seasonChoice === "some") {
            const ignored_seasons = showSeasons.filter(
                season => !formValues.seasons.includes(season.number)
            );
            searchCriteria.ignore_seasons = ignored_seasons.map(season => season.number);
        }
        
        try {
            const showData = await addNewShow(
                showSelected.show.name,
                searchCriteria,
                currentUser.token
            );
            setState('success');
            setOpenModal(false);
            setShows(current => [...current, showData]);
            notification.success({
                message: 'Success!',
                description: (
                    <>
                        {showData.show_name} has been added.
                        <br/>
                        <NavLink to={`/shows/${showData.show_name}`}>View show</NavLink>
                    </>
                ),
                duration: 8
            });
        }
        catch(error) {
            if (error?.response) {
                const response = error.response as ErrorResponse;
                setError(response.data?.message || 'You have been logged out. Please login again to add this show');
                setState('error');
            }
        }
    };

    const searchNewShowHandle = async () => {
        const searchShowResults = await searchNewShow(searchTerm);
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
                        <Carousel
                            dots={false}
                            arrows
                            nextArrow={<NextArrow />}
                            prevArrow={<PrevArrow />}
                            afterChange={change => setIndex(change + 1)}
                        >
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
                                    <img src={result.show?.image?.medium} style={{ margin: '0 auto'}} />
                                    <p dangerouslySetInnerHTML={{ __html: result.show.summary }} />
                                    <blockquote>Premiered: {" "}
                                        <Tag color="processing">
                                            {moment(result.show.premiered).format('DD MMMM YYYY')}
                                        </Tag>
                                    </blockquote>
                                    <blockquote>Status: <ShowStatusTag status={result.show.status} /></blockquote>
                                </div>
                            ))}
                        </Carousel>
                    </>
                ) : state === 'selected' && (
                    <>
                        <Form.Item
                            name="exactSearch"
                            valuePropName="checked"
                        >
                            <Checkbox name="exact_search">Exact Title Search</Checkbox>
                        </Form.Item>
                        <Form.Item
                            name="seasonChoice"
                            label="How many seasons?"
                            required
                            rules={[
                                {
                                    required: true,
                                    message: "Please select how many seasons you'd like"
                                }
                            ]}
                        >
                            <Radio.Group onChange={value => setSeasonChoice(value.target.value)}>
                                <Space direction="vertical">
                                    <Radio value="all">All Seasons</Radio>
                                    <Radio value="some">Some Seasons</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                        {seasonChoice === "some" && (
                            <Form.Item
                                name="seasons"
                                label="Select the desired seasons"
                            >
                                <Select
                                    options={
                                        showSeasons.map(season => ({
                                            label: `Season ${season.number}`,
                                            value: season.number
                                        }))
                                    }
                                    mode="multiple"
                                />
                            </Form.Item>
                        )}
                    </>
                )}
                {error && (
                    <Alert
                        type="error"
                        message={error}
                        description="Note: You can edit your search term to start again"
                    />
                )}
            </Form>
        </Modal>
    );
};

export default AddShow;