import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Alert, Button, Form, List, Modal, Select, Space } from "antd";

import { UserContext } from "../contexts/UserContext";
import { getRecordedShows, getReminders, getUser, updateSubscriptions } from "../requests/requests";
import { RecordedShowModel, Reminder, SubscriptionsPayload, User } from "../utils";
import "../styles/ProfilePage.css";

interface ResponseResult {
    notificationType: 'alert' | 'modal' | 'none'
    submitted: boolean
    result: boolean
    message: string
};

const ProfilePage = () => {
    const { user } = useParams<{user: string}>();
    const { currentUser, setUser } = useContext(UserContext);
    const [ form ] = Form.useForm();
    const baseResult: ResponseResult = {
        notificationType: 'none',
        submitted: false,
        result: false,
        message: ''
    };

    const [userDetails, setUserDetails] = useState<User>(null);
    const [userNotExists, setUserNotExists] = useState(false);
    const [showAddSubscriptionModal, setShowAddSubscriptionModal] = useState(false);
    const [resource, setResource] = useState<'searchList' | 'reminders' | ''>('');
    const [recordedShows, setRecordedShows] = useState<RecordedShowModel[]>([]);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [responseResult, setResponseResult] = useState<ResponseResult>(baseResult);

    const viewingOwnProfile = user === currentUser.username;

    useEffect(() => {
        if (user !== 'undefined') {
            getUser(user).then(response => {
                if (response.result === 'success') {
                    setUserDetails(response.payload);
                }
                else {
                    setUserNotExists(true);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        if (resource === 'searchList') {
            getRecordedShows().then(recordedShows => setRecordedShows(recordedShows));
        }
        if (resource === 'reminders') {
            getReminders().then(reminders => setReminders(reminders));
        }
    }, [resource]);

    const subscribe = (resource: 'searchList' | 'reminders') => {
        if (resource === 'searchList') {
            const updatedSearchList = userDetails.show_subscriptions.concat(form.getFieldValue('shows'));
            updateSubscriptionsHandle({ show_subscriptions: updatedSearchList }, 'subscribe');
        }
        else {
            const updatedReminders = userDetails.reminder_subscriptions.concat(form.getFieldValue('shows'));
            updateSubscriptionsHandle({ reminder_subscriptions: updatedReminders }, 'subscribe');
        }
    };

    const unsubscribe = (resource: 'searchList' | 'reminders', show: string) => {
        if (resource === 'searchList') {
            const updatedSearchList = userDetails.show_subscriptions.filter(searchItem => searchItem !== show);
            updateSubscriptionsHandle({ show_subscriptions: updatedSearchList }, 'unsubscribe');
        }
        else {
            const updatedReminders = userDetails.reminder_subscriptions.filter(reminder => reminder !== show);
            updateSubscriptionsHandle({ reminder_subscriptions: updatedReminders }, 'unsubscribe');
        }
    };

    const resetAllSubscriptions = async (resource: 'searchList' | 'reminders') => {
        let subscriptions: SubscriptionsPayload;
        if (resource === 'searchList') {
            subscriptions = {
                show_subscriptions: []
            };
        }
        else {
            subscriptions = {
                reminder_subscriptions: []
            };
        }
        updateSubscriptionsHandle(subscriptions, 'unsubscribe');
    };

    const updateSubscriptionsHandle = async (subscriptions: SubscriptionsPayload, action: 'subscribe' | 'unsubscribe') => {
        const response = await updateSubscriptions(user, subscriptions, currentUser.token);
        if (response.result === 'success') {
            setResponseResult({
                notificationType: action === 'unsubscribe' ? 'modal' : 'alert',
                submitted: true,
                result: true,
                message: response.payload.message
            });
            setUserDetails(response.payload.user);
            if (viewingOwnProfile) {
                setUser(prevState => ({ token: prevState.token, ...response.payload.user }));
            }
        }
        else {
            const message = response?.msg
                ? 'You have been signed out. Please sign in again to unsubscribe'
                : response.message;
            setResponseResult({
                notificationType: action === 'unsubscribe' ? 'modal' : 'alert',
                submitted: true,
                result: false,
                message: message
            });
        }
    };

    const openAddSubscriptionModal = (resource: 'searchList' | 'reminders') => {
        setShowAddSubscriptionModal(true);
        setResource(resource);
    };

    const closeAddSubscriptionsModal = () => {
        setShowAddSubscriptionModal(false);
        form.setFieldValue('shows', []);
        closeModal();
    };

    const closeModal = () => {
        setResponseResult(baseResult);
    };

    const setSelectOptions = () => {
        if (resource === 'searchList' && recordedShows.length > 0) {
            return recordedShows.map(recordedShow => (
                { label: recordedShow.show, value: recordedShow.show }
            ));
        }
        else if (resource === 'reminders' && reminders.length > 0) {
            return reminders.filter(reminder => userDetails.show_subscriptions.includes(reminder.show))
                .map(reminder => (
                    { label: reminder.show, value: reminder.show }
                ));
        }
        else {
            return [];
        }
    };

    return (
        userDetails ? (
            <>
                <h1>{userDetails.username}</h1>
                <div id="subscription-list-container">
                    <List
                        bordered
                        dataSource={userDetails.show_subscriptions}
                        renderItem={item => (
                            <List.Item
                                actions={viewingOwnProfile ? [
                                    <Button onClick={() => unsubscribe('searchList', item)}>Unsubscribe</Button>
                                ] : []}
                            >
                                <span>{item}</span>
                            </List.Item>
                        )}
                        header={<strong>Your Show Subscriptions</strong>}
                        className="subscription-list"
                        footer={viewingOwnProfile && (
                            <Space>
                                <Button onClick={() => openAddSubscriptionModal('searchList')}>Subscribe to a Show</Button>
                                <Button onClick={() => resetAllSubscriptions('searchList')}>Unsubscribe from all</Button>
                            </Space>
                        )}
                    />
                    <List
                        bordered
                        dataSource={userDetails.reminder_subscriptions}
                        renderItem={item => (
                            <List.Item
                                actions={viewingOwnProfile ? [
                                    <Button onClick={() => unsubscribe('reminders', item)}>Unsubscribe</Button>
                                ] : []}
                            >
                                <span>{item}</span>
                            </List.Item>
                        )}
                        header={<strong>Your Reminder Subscriptions</strong>}
                        className="subscription-list"
                        footer={viewingOwnProfile && (
                            <Space>
                                <Button onClick={() => openAddSubscriptionModal('reminders')}>Subscribe to a Reminder</Button>
                                <Button onClick={() => resetAllSubscriptions('reminders')}>Unsubscribe from all</Button>
                            </Space>
                        )}
                    />
                    <Modal
                        open={responseResult.notificationType === 'modal' && responseResult.submitted}
                        onOk={closeModal}
                        closeIcon={false}
                        cancelButtonProps={{style: { display: 'none' } }}
                    >
                        <Alert type={responseResult.result ? "success" : "error"} message={responseResult.message} />
                    </Modal>
                </div>
                <Modal
                    open={showAddSubscriptionModal}
                    okText={responseResult.submitted && responseResult.result ? 'Close' : 'Submit'}
                    onOk={() => !responseResult.submitted && resource ? subscribe(resource) : closeAddSubscriptionsModal()}
                    onCancel={closeAddSubscriptionsModal}
                    cancelButtonProps={responseResult.result && { style: { display: 'none' } }}
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
                    {responseResult.notificationType === 'alert' && responseResult.submitted && (
                        <Alert type={responseResult.result ? 'success' : 'error'} message={responseResult.message} />
                    )}
                </Modal>
            </>
        )
        : userNotExists ? (
            <Alert
                type="error"
                className="user-alert"
                message="Error!"
                description={`An account with the username ${user} could not be found`}
            />
        ) : (
            <Alert type="info" className="user-alert" message="Retrieving user..." />
        )
    );
};

export default ProfilePage;