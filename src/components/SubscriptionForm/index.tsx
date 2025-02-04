import { useContext, useEffect, useState } from "react";
import { Form, Modal, Select } from "antd";


import { getShows } from "../../requests";
import { ShowData, SubscriptionsPayload, User } from "../../utils/types";
import { RecordedShowsContext } from "../../contexts";


interface SubscriptionFormProps {
    showForm: boolean
    userDetails: User
    toggleModal: () => void
    updateSubscriptionsHandle: (subscriptions: SubscriptionsPayload) => Promise<void>
}

const SubscriptionForm = (props: SubscriptionFormProps) => {
    const { showForm, userDetails, toggleModal, updateSubscriptionsHandle } = props;
    
    const { shows } = useContext(RecordedShowsContext);

    const [ form ] = Form.useForm();

    const setSelectOptions = () => {
        const filteredShows = shows.filter(show => show.search_item);
        return filteredShows.map(show => ({ label: show.show_name, value: show.show_name }));
    };

    const subscribe = () => {
        const subscriptions: SubscriptionsPayload = {
            show_subscriptions: form.getFieldValue('shows'),
            action: "subscribe"
        };
        updateSubscriptionsHandle(subscriptions);
        toggleModal();
    };


    return (
        <Modal
            open={showForm}
            okText="Submit"
            onOk={() => subscribe()}
            onCancel={toggleModal}
            closeIcon={false}
        >
            <Form
                form={form}
                name="add_show_subscription"
            >
                <Form.Item name="shows" label="Select shows to subscribe to">
                    <Select
                        options={setSelectOptions()}
                        showSearch
                        mode="multiple"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export { SubscriptionForm };