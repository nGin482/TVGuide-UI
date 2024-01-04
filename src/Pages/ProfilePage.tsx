import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Alert, Button, List } from "antd";

import { UserContext } from "../contexts/UserContext";
import { getUser } from "../requests/requests";
import { User } from "../utils";
import "../styles/ProfilePage.css";


const ProfilePage = () => {
    const { user } = useParams<{user: string}>();
    const { currentUser } = useContext(UserContext);

    const [userDetails, setUserDetails] = useState<User>(null);
    const [userNotExists, setUserNotExists] = useState(false);

    useEffect(() => {
        if (user === currentUser.user) {
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
    }, [user, currentUser]);

    const resetAllSubscriptions = () => {
        console.log('resetting all subscriptions')
    }


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
                            <List.Item>
                                <span>{item}</span>
                            </List.Item>
                        )}
                        header={<strong>Your Show Subscriptions</strong>}
                        className="subscription-list"
                        footer={<Button onClick={resetAllSubscriptions}>Reset all subscriptions</Button>}
                    />
                    <List
                        bordered
                        dataSource={userDetails.reminders}
                        renderItem={item => (
                            <List.Item>
                                <span>{item}</span>
                            </List.Item>
                        )}
                        header={<strong>Your Reminder Subscriptions</strong>}
                        className="subscription-list"
                        footer={<Button onClick={resetAllSubscriptions}>Reset all subscriptions</Button>}
                    />
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