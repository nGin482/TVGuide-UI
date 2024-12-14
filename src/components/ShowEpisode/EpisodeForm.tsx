import { useContext, useEffect, useState } from "react";
import { DatePicker, Form, Modal, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";

import { CustomEditor } from "../Editor";
import { CHANNELS } from "./channels";
import { RecordedShowsContext } from "../../contexts";
import { getEpisodes, getShowSeasons } from "../../requests";
import { ShowEpisode } from "../../utils/types";
import { TVMazeEpisode, TVMazeSeason } from "../../utils/types/tvmaze";

interface EpisodeFormProps {
    episode: ShowEpisode
    open: boolean
    closeForm: () => void
    successHandler: () => void
}

const EpisodeForm = (props: EpisodeFormProps) => {
    const { episode, open, closeForm, successHandler } = props;

    const [formValues, setFormValues] = useState<ShowEpisode>(episode);
    const [allSeasons, setAllSeasons] = useState<TVMazeSeason[]>([]);
    const [allEpisodes, setAllEpisodes] = useState<TVMazeEpisode[]>([]);
    const [episodeSelected, setEpisodeSelected] = useState<TVMazeEpisode>(null);
    
    const [form] = Form.useForm<ShowEpisode>();
    const { shows } = useContext(RecordedShowsContext);

    useEffect(() => {
        const showData = shows.find(show => show.show_name === episode.show);
        fetchAllSeasons(showData.show_details.tvmaze_id);
        fetchAllEpisodes(showData.show_details.tvmaze_id);
    }, []);

    useEffect(() => {
        console.log(formValues)
        setEpisodeSelected(allEpisodes.find(tvmazeEpisode =>
            tvmazeEpisode.season === formValues.season_number &&
            tvmazeEpisode.number === formValues.episode_number
        ));
    }, [formValues.season_number, formValues.episode_number])
    
    useEffect(() => {
        if (episodeSelected && formValues.episode_title !== episodeSelected?.name) {
            form.setFieldsValue({
                episode_title: episodeSelected.name,
                summary: episodeSelected.summary
            });
            setFormValues(current => ({
                ...current,
                episode_title: episodeSelected.name,
                summary: episodeSelected.summary
            }));
        }
    }, [episodeSelected]);

    const fetchAllSeasons = async (tvmazeId: string) => {
        const seasons = await getShowSeasons(tvmazeId);
        setAllSeasons(seasons);
    };

    const fetchAllEpisodes = async (tvmazeId: string) => {
        const episodes = await getEpisodes(tvmazeId);
        setAllEpisodes(episodes);
    };

    const convertDatetoDayJS = (date: Date) => dayjs(date);

    const handleInput = (field: keyof ShowEpisode, value: string | string[] | number | Dayjs) => {
        setFormValues(current => ({ ...current, [field]: value }));
    };

    return (
        <Modal
            open={open}
            onCancel={closeForm}
            title={`Edit ${episode.episode_title}`}
            okText="Edit Episode"
        >
            <Form<ShowEpisode>
                form={form}
            >
                <Form.Item
                    label="Season Number"
                    name="season_number"
                    initialValue={episode.season_number}
                >
                    <Select
                        options={allSeasons.map(season => ({
                            label: `${season.number}`,
                            value: season.number
                        }))}
                        onChange={value => handleInput("season_number", value)}
                        value={episode.season_number}
                    />
                </Form.Item>
                <Form.Item
                    label="Episode Number"
                    name="episode_number"
                    initialValue={episode.episode_number}
                >
                    <Select
                        options={allEpisodes.filter(tvmazeEpisode => 
                            tvmazeEpisode.season === formValues.season_number
                        ).map(episode => ({
                                label: `${episode.number}`,
                                value: episode.number
                            })
                        )}
                        onChange={value => handleInput("episode_number", value)}
                        value={episode.episode_number}
                    />
                </Form.Item>
                <Form.Item
                    label="Episode Title"
                    name="episode_title"
                    initialValue={episode.episode_title}
                >
                    <Input
                        onChange={event => handleInput("episode_title", event.currentTarget.value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Alternative Titles"
                    name="alternative_titles"
                    initialValue={episode.alternative_titles}
                >
                    <Select
                        mode="tags"
                        options={formValues.alternative_titles.map(title => ({
                            label: title,
                            value: title 
                        }))}
                        onChange={value => handleInput("alternative_titles", value)}
                        value={formValues.alternative_titles}
                    />
                </Form.Item>
                <Form.Item
                    label="Summary"
                    name="summary"
                    initialValue={episode.summary}
                >
                    <CustomEditor
                        content={formValues.summary}
                        updateContent={handleInput}
                    />
                </Form.Item>
                <Form.Item
                    label="Channels"
                    name="channels"
                    initialValue={episode.channels}
                >
                    <Select
                        onChange={event => handleInput("channels", event.currentTarget.value)}
                        mode="multiple"
                        options={CHANNELS.map(network => ({
                            label: network.network,
                            options: network.channels.map(channel => ({
                                label: channel,
                                value: channel
                            }))
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Air Dates"
                    name="air_dates"
                    initialValue={episode.air_dates.map(date => convertDatetoDayJS(date))}
                >
                    <DatePicker
                        multiple
                        onChange={date => handleInput("air_dates", date)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export { EpisodeForm };
