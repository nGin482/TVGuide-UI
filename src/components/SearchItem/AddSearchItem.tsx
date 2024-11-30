import { useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Checkbox, Form, Modal, Radio, Select, Space, Spin } from "antd";

import { RecordedShowsContext } from "../../contexts";
import { ShowData, TVMazeSeason } from "../../utils/types";
import { getEpisodes, getShowSeasons } from "../../requests";
import { TVMazeEpisode } from "../../utils/types/tvmaze";


interface AddSearchItemProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    show: string
}

interface FormValues {
    exactSearch: boolean
    seasonChoice: "all" | "some"
    seasons: number[]
    ignoreEpisodes: string[]
}

const AddSearchItem = ({ open, setOpen, show }: AddSearchItemProps) => {
    const [showData, setShowData] = useState<ShowData>();
    const [showSeasons, setShowSeasons] = useState<TVMazeSeason[]>(null);
    const [formValues, setFormValues] = useState<FormValues>(null);
    const [showEpisodes, setShowEpisodes] = useState<TVMazeEpisode[]>(null);
    const [filteredEpisodes, setFilteredEpisodes] = useState<TVMazeEpisode[]>(null);

    const { shows } = useContext(RecordedShowsContext);

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

    const submitSearchItem = () => {
        form.validateFields();
        if (!form.getFieldsValue().exactSearch) {
            form.setFieldValue('exact_search', false);
        }
        
        const formValues = form.getFieldsValue();
        console.log(formValues)
    };

    return (
        showData ? (
            <Modal
                open={open}
                title={`Add Search Criteria for ${showData.show_name}`}
                onCancel={() => setOpen(false)}
                onOk={submitSearchItem}
            >
                <Form
                    form={form} 
                >
                    <Form.Item
                        name="exactSearch"
                        valuePropName="checked"
                    >
                        <Checkbox name="exact_search">Exact Title Match</Checkbox>
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

export { AddSearchItem };