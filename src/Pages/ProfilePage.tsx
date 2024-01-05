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
    const { currentUser } = useContext(UserContext);

    const [userDetails, setUserDetails] = useState<User>(null);
    const [userNotExists, setUserNotExists] = useState(false);
    const [responseResult, setResponseResult] = useState<ResponseResult>({ submitted: false, result: false, message: '' });

    const viewingOwnProfile = user === currentUser.user;

    useEffect(() => {
        if (viewingOwnProfile) {
            setUserDetails(currentUser);
        }
        else {
            getUser(user).then(response => {
                if (response.payload.result === 'success') {
                    setUserDetails(response.payload);
                }
                else {
                    setUserNotExists(true);
                }
            });
        }
    }, [user, currentUser, viewingOwnProfile]);

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
        const response = await updateSubscriptions(user, subscriptions, currentUser.token);
        if (response.payload.result === 'success') {
            delete response.payload.result;
            delete response.payload.message;
            setResponseResult({
                submitted: true,
                result: true,
                message: `You have unsubscribed reset your ${resource === 'searchList' ? 'Search List' : 'Reminder'} subscriptions`
            });
            setUserDetails(response.payload);
        }
        else {
            console.log(response.payload.message || response.payload.msg);
            setResponseResult({
                submitted: true,
                result: false,
                message: response.payload.message || response.payload.msg
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
                <h1>{userDetails.user} - {user}</h1>
                <p><strong>{userDetails.role}</strong></p>
                <div id="subscription-list-container">
                    <List
                        bordered
                        dataSource={userDetails.searchList}
                        renderItem={item => (
                            <List.Item
                                actions={viewingOwnProfile ? [
                                    <Button onClick={() => console.log('clicked this')}>Unsubscribe</Button>
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
                        dataSource={userDetails.reminders}
                        renderItem={item => (
                            <List.Item
                                actions={viewingOwnProfile ? [
                                    <Button onClick={() => console.log('clicked this')}>Unsubscribe</Button>
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