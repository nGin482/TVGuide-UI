import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Alert, Button, List, Modal } from "antd";

import { UserContext } from "../contexts/UserContext";
import { getUser, updateSubscriptions } from "../requests/requests";
import { User, SubscriptionsPayload } from "../utils";
import "../styles/ProfilePage.css";

interface ResponseResult {
    submitted: boolean
    result: boolean
    message: string
};

const ProfilePage = () => {
    const { user } = useParams<{user: string}>();
    const { currentUser, setUser } = useContext(UserContext);

    const [userDetails, setUserDetails] = useState<User>(null);
    const [userNotExists, setUserNotExists] = useState(false);
    const [responseResult, setResponseResult] = useState<ResponseResult>({ submitted: false, result: false, message: '' });

    const viewingOwnProfile = user === currentUser.username;

    useEffect(() => {
        if (viewingOwnProfile) {
            setUserDetails(currentUser);
        }
        else {
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
        }
    }, [user, currentUser, viewingOwnProfile]);

    const unsubscribe = (resource: 'searchList' | 'reminders', show: string) => {
        if (resource === 'searchList') {
            const updatedSearchList = userDetails.show_subscriptions.filter(searchItem => searchItem !== show);
            updateSubscriptionsHandle(resource, { show_subscriptions: updatedSearchList });
        }
        else {
            const updatedReminders = userDetails.reminder_subscriptions.filter(reminder => reminder !== show);
            updateSubscriptionsHandle(resource, { reminder_subscriptions: updatedReminders });
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
        updateSubscriptionsHandle(resource, subscriptions);
    };

    const updateSubscriptionsHandle = async (resource: 'searchList' | 'reminders', subscriptions: SubscriptionsPayload) => {
        const response = await updateSubscriptions(user, subscriptions, currentUser.token);
        console.log(response)
        if (response.result === 'success') {
            setResponseResult({
                submitted: true,
                result: true,
                message: response.payload.message
            });
            setUserDetails(response.payload.user);
            if (viewingOwnProfile) {
                console.log('hey hey hey happy halloween everybody')
                console.log(response.payload.user)
                setUser(prevState => ({ token: prevState.token, ...response.payload.user }));
            }
        }
        else {
            const message = response?.msg
                ? 'You have been signed out. Please sign in again to unsubscribe'
                : response.message;
            setResponseResult({
                submitted: true,
                result: false,
                message: message
            });
        }
    };

    const closeModal = () => {
        setResponseResult({
            submitted: false,
            result: false,
            message: ''
        });
    };


    return (
        userDetails ? (
            <>
                <h1>{userDetails.username} - {user}</h1>
                <p><strong>{userDetails.role}</strong></p>
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
                            <Button onClick={() => resetAllSubscriptions('searchList')}>Unsubscribe from all</Button>
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
                            <Button onClick={() => resetAllSubscriptions('reminders')}>Unsubscribe from all</Button>
                        )}
                    />
                    <Modal
                        open={responseResult.submitted}
                        onOk={closeModal}
                        closeIcon={false}
                        cancelButtonProps={{style: { display: 'none' } }}
                    >
                        <Alert type={responseResult.result ? "success" : "error"} message={responseResult.message} />
                    </Modal>
                </div>
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