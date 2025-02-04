import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import { Alert, App, Button, List, Space, Spin, Typography } from "antd";

import TVGuide from "../components/TVGuide";
import { SubscriptionForm } from "../components/SubscriptionForm";
import { UserContext } from "../contexts/UserContext";
import { getGuide, getUser, getUserSubscriptions, addSubscriptions } from "../requests";
import { sessionExpiryMessage } from "../utils";
import { Guide, SubscriptionsPayload, SuccessResponse, User, UserResponses } from "../utils/types";
import "../styles/ProfilePage.css";

interface UserParam {
    user: string
}

const ProfilePage = () => {
    const { user } = useParams<UserParam>();
    const { currentUser, setUser } = useContext(UserContext);
    
    const [viewingOwnProfile, setViewingOwnProfile] = useState(false);
    const [userDetails, setUserDetails] = useState<User>(null);
    const [loadingUser, setLoadingUser] = useState(false);
    const [userTVGuide, setUserTVGuide] = useState<Guide>(null);
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    
    const { notification } = App.useApp();
    const { Text } = Typography;
    
    useEffect(() => {
        if (user) {
            setLoadingUser(true);
            fetchUser(user);
            fetchUserSubscriptions(user);
            fetchGuide();
        }
    }, [user]);

    useEffect(() => {
        if (user && currentUser && user === currentUser.username) {
            setViewingOwnProfile(true);
        }
    }, [user, currentUser]);

    const fetchUser = async (username: string) => {
        const user = await getUser(username);
        setUserDetails(user);
        setLoadingUser(false);
    };

    const fetchUserSubscriptions = async (username: string) => {
        await getUserSubscriptions(username);
    };

    const fetchGuide = async () => {
        const guide = await getGuide();
        setUserTVGuide(guide);
    };

    const toggleModal = () => {
        setShowSubscriptionModal(current => !current);
    };

    const unsubscribe = (show: string) => {
        const updatedSearchList = userDetails.show_subscriptions.filter(
            searchItem => searchItem.show !== show
        );
        const subscriptions: SubscriptionsPayload = {
            show_subscriptions: updatedSearchList.map(show => show.show),
            action: "unsubscribe"
        };
        updateSubscriptionsHandle(subscriptions);
    };

    const resetAllSubscriptions = async () => {
        const subscriptions: SubscriptionsPayload = {
            show_subscriptions: [],
            action: "unsubscribe"
        };
        updateSubscriptionsHandle(subscriptions);
    };

    const updateSubscriptionsHandle = async (payload: SubscriptionsPayload) => {
        let response: User;
        try {
            if (payload.action === "subscribe") {
                response = await addSubscriptions(user, payload.show_subscriptions, currentUser.token);
            }
            else {

            }
            setUserDetails(response);
            if (viewingOwnProfile) {
                setUser(prevState => ({ token: prevState.token, ...response }));
            }
            notification.success({
                message: "Success!",
                description: "Your subscriptions have been updated",
            });
        }
        catch(error) {
            console.error(error)
            const message = error?.response?.data?.msg
                ? sessionExpiryMessage(payload.action)
                : error.message;
            notification.error({
                message: "An error occurred updating your show subscriptions!",
                description: <Text>{message}</Text>
            });
        }
    };

    return (
        userDetails ? (
            <>
                <Helmet>
                    <title>{userDetails.username} Profile | TVGuide</title>
                </Helmet>
                <h1>{userDetails.username}</h1>
                {viewingOwnProfile && userTVGuide && (
                    <TVGuide
                        guide={userTVGuide}
                        user={userDetails}
                    />
                )}
                <div id="subscription-list-container">
                    <List
                        bordered
                        dataSource={userDetails.show_subscriptions}
                        renderItem={item => (
                            <List.Item
                                actions={viewingOwnProfile ? [
                                    <Button onClick={() => unsubscribe(item.show)}>Unsubscribe</Button>
                                ] : []}
                            >
                                <span>{item.show}</span>
                            </List.Item>
                        )}
                        header={<strong>{viewingOwnProfile ? 'Your' : `${user}'s`} Show Subscriptions</strong>}
                        className="subscription-list"
                        footer={viewingOwnProfile && (
                            <Space>
                                <Button onClick={() => toggleModal()}>Subscribe to a Show</Button>
                                <Button onClick={() => resetAllSubscriptions()}>Unsubscribe from all</Button>
                            </Space>
                        )}
                    />
                </div>
                <SubscriptionForm
                    showForm={showSubscriptionModal}
                    userDetails={userDetails}
                    toggleModal={toggleModal}
                    updateSubscriptionsHandle={updateSubscriptionsHandle}
                />
            </>
        )
        : !loadingUser && !userDetails ? (
            <Alert
                type="error"
                className="user-alert"
                message="Error!"
                description={`An account with the username ${user} could not be found`}
            />
        ) : (
            <Spin fullscreen />
        )
    );
};

export default ProfilePage;