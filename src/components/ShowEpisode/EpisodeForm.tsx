import { useEffect, useState } from "react";
import { DatePicker, Form, Modal, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";

import { CHANNELS } from "./channels";
import { ShowEpisode } from "../../utils/types";

interface EpisodeFormProps {
    episode: ShowEpisode
    open: boolean
    closeForm: () => void
    successHandler: () => void
}

const EpisodeForm = (props: EpisodeFormProps) => {
    const { episode, open, closeForm, successHandler } = props;

    const [formValues, setFormValues] = useState<ShowEpisode>(episode);

    useEffect(() => {
        console.log(formValues)
    }, [formValues])

    const [form] = Form.useForm<ShowEpisode>();

    const convertDatetoDayJS = (date: Date) => {
        return dayjs(date);
    };

    const handleInput = (field: keyof ShowEpisode, value: string | number | Dayjs) => {
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
                    <Input
                        onChange={event => handleInput("season_number", event.currentTarget.value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Episode Number"
                    name="episode_number"
                    initialValue={episode.episode_number}
                >
                    <Input
                        onChange={event => handleInput("episode_number", event.currentTarget.value)}
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
                    label="Summary"
                    name="summary"
                    initialValue={episode.summary}
                >
                    <Input.TextArea
                        onChange={event => handleInput("summary", event.currentTarget.value)}
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
