import { useEffect, useState } from "react";
import { Form, Modal, Select } from "antd";

import { getShows } from "../../requests";
import { ShowData, SubscriptionsPayload, User } from "../../utils/types";


interface SubscriptionFormProps {
    showForm: boolean
    userDetails: User
    toggleModal: () => void
    updateSubscriptionsHandle: (subscriptions: SubscriptionsPayload) => Promise<void>
}

const SubscriptionForm = (props: SubscriptionFormProps) => {
    const { showForm, userDetails, toggleModal, updateSubscriptionsHandle } = props;

    const [recordedShows, setRecordedShows] = useState<ShowData[]>([]);

    useEffect(() => {
        getShows().then(shows => setRecordedShows(shows));
    }, []);

    const [ form ] = Form.useForm();

    const setSelectOptions = () => {
        return recordedShows.map(recordedShow => (
            { label: recordedShow.show_name, value: recordedShow.show_name }
        ));
    };

    const subscribe = () => {
        const updatedSearchList = userDetails.show_subscriptions.concat(form.getFieldValue('shows'));
        const subscriptions: SubscriptionsPayload = {
            show_subscriptions: updatedSearchList,
            action: "subscribe"
        };
        updateSubscriptionsHandle(subscriptions);
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