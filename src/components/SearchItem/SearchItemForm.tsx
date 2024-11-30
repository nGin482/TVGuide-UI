import { useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Checkbox, Form, Modal, notification, Radio, Select, Space, Spin } from "antd";

import { RecordedShowsContext, UserContext } from "../../contexts";
import { addSearchCriteria, getEpisodes, getShowSeasons } from "../../requests";
import {
    ErrorResponse,
    SearchItem,
    SearchItemPayload,
    ShowData,
    TVMazeSeason
} from "../../utils/types";
import { TVMazeEpisode } from "../../utils/types/tvmaze";


interface AddSearchItemProps {
    mode: "add" | "edit"
    open: boolean
    show: string
    closeModal: () => void
    successHandler: (searchCriteria: SearchItemPayload) => void
    searchItem?: SearchItem
}

interface FormValues {
    exactSearch: boolean
    seasonChoice: "all" | "some"
    seasons: number[]
    ignoreEpisodes: string[]
}

const SearchItemForm = (props: AddSearchItemProps) => {
    const { mode, open, closeModal, successHandler, show, searchItem } = props;

    const [showData, setShowData] = useState<ShowData>();
    const [showSeasons, setShowSeasons] = useState<TVMazeSeason[]>(null);
    const [formValues, setFormValues] = useState<FormValues>(null);
    const [showEpisodes, setShowEpisodes] = useState<TVMazeEpisode[]>(null);
    const [filteredEpisodes, setFilteredEpisodes] = useState<TVMazeEpisode[]>(null);

    const { shows } = useContext(RecordedShowsContext);
    const { currentUser } = useContext(UserContext);

    const [form] = Form.useForm<FormValues>();

    useEffect(() => {
        const showItem = shows.find(showData => showData.show_name === show);
        setShowData(showItem)
    }, []);

    useEffect(() => {
        if (showData) {
            const tvmazeId = showData.show_details.tvmaze_id;
            fetchShowSeasons(tvmazeId);
            fetchShowEpisodes(tvmazeId);
        }
    }, [showData]);
    
    useEffect(() => {
        if (showSeasons) {
            setInitialValuesForSeasons();
        }
    }, [showSeasons]);

    useEffect(() => {
        console.log(formValues)
    }, [formValues]);


    const handleFormUpdate = (field: keyof FormValues, value: string | string[] | number[]) => {
        setFormValues(current => ({ ...current, [field]: value }));
    };

    const filterOptions = (input: string) => {
        setFilteredEpisodes(showEpisodes.filter(
            episode => episode.name.toLowerCase().includes(input.toLowerCase())
        ));
    };

    const createEpisodeLabel = (episode: TVMazeEpisode) => {
        return `Season ${episode.season} Episode ${episode.number}: ${episode.name}`;
    };

    const fetchShowSeasons = async (tvmazeId: string) => {
        const seasons = await getShowSeasons(tvmazeId);
        setShowSeasons(seasons);
    };
    
    const fetchShowEpisodes = async (tvmazeId: string) => {
        const episodes = await getEpisodes(tvmazeId);
        setShowEpisodes(episodes);
        setFilteredEpisodes(episodes);
    };

    const setInitialValuesForSeasons = () => {
        if (showSeasons.length !== searchItem.conditions.ignore_seasons.length) {
            form.setFieldValue("seasonChoice", "some");
            handleFormUpdate("seasonChoice", "some");
            const seasonsSelected = showSeasons.filter(
                season => !searchItem.conditions.ignore_seasons.includes(season.number)
            );
            handleFormUpdate("seasons", seasonsSelected.map(season => season.number));
            form.setFieldValue("seasons", seasonsSelected.map(season => season.number));
        }
        else {
            form.setFieldValue("seasonChoice", "all");
            handleFormUpdate("seasonChoice", "all");
        }
    }

    const submitSearchItem = async () => {
        form.validateFields();
        if (!form.getFieldsValue().exactSearch) {
            form.setFieldValue('exact_search', false);
        }
        
        const formValues = form.getFieldsValue();

        let seasons = formValues?.seasons;
        if (formValues.seasonChoice === "all") {
            seasons = showSeasons.map(season => season.number);
        }
        const conditions: SearchItemPayload['conditions'] = {
            exact_title_match: formValues?.exactSearch || false,
            min_season_number: Math.min(...seasons),
            max_season_number: Math.max(...seasons),
            ignore_episodes: formValues?.ignoreEpisodes || []
        };
        if (formValues.seasonChoice === "some") {
            const ignored_seasons = showSeasons.filter(
                season => !formValues.seasons.includes(season.number)
            );
            conditions.ignore_seasons = ignored_seasons.map(season => season.number);
        }

        const searchCriteria: SearchItemPayload = {
            show,
            conditions
        };

        try {
            successHandler(searchCriteria);
        }
        catch(error) {
            let message: string =  error?.message;
            if (error?.response) {
                const responseError: ErrorResponse = error.response;
                if (responseError.data.msg) {
                    message = "You have been logged out. Please login again to add this search criteria.";
                }
                else {
                    message = responseError.data.message;
                }
            }
            notification.error({
                message: `Unable to add the search criteria for ${show}`,
                description: message,
                duration: 8
            });
        }
    };

    return (
        showData ? (
            <Modal
                open={open}
                title={`${mode[0].toUpperCase() + mode.slice(1)} Search Criteria for ${showData.show_name}`}
                onCancel={closeModal}
                onOk={submitSearchItem}
            >
                <Form
                    form={form}
                >
                    <Form.Item
                        name="exactSearch"
                        valuePropName="checked"
                        initialValue={searchItem.exact_title_match}
                    >
                        <Checkbox name="exact_search">Exact Title Match</Checkbox>
                    </Form.Item>
                    <Form.Item
                            name="seasonChoice"
                            label="How many seasons?"
                            required
                            // initialValue={seasonChoiceInitial}
                            rules={[
                                {
                                    required: true,
                                    message: "Please select how many seasons you'd like"
                                }
                            ]}
                        >
                            <Radio.Group
                                onChange={value => handleFormUpdate(
                                    "seasonChoice",
                                    value.target.value)
                                }
                            >
                                <Space direction="vertical">
                                    <Radio value="all">All Seasons</Radio>
                                    <Radio value="some">Some Seasons</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    {formValues?.seasonChoice === "some" && (
                        <Form.Item
                            name="seasons"
                            label="Seasons"
                        >
                            <Select
                                options={showSeasons ? showSeasons.map(season => (
                                    {
                                        label: `Season ${season.number}`,
                                        value: season.number
                                    }
                                )) : []}
                                mode="multiple"
                                onChange={(value: number[]) => handleFormUpdate("seasons", value)}
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                            name="ignoreEpisodes"
                            label="Ignore Episodes"
                            initialValue={searchItem.conditions.ignore_episodes}
                        >
                            <Select
                                options={filteredEpisodes ? filteredEpisodes.map(episode => (
                                    {
                                        label: createEpisodeLabel(episode),
                                        value: episode.name
                                    }
                                )) : []}
                                onSearch={value => filterOptions(value)}
                                onChange={(value: string[]) => handleFormUpdate(
                                    "ignoreEpisodes",
                                    value
                                )}
                                mode="multiple"
                            />
                        </Form.Item>
                </Form>
            </Modal>
        ) : (
            <Spin fullscreen />
        )
    );
};

export { SearchItemForm };