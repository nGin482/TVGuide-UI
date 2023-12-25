import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Alert, Button, List } from "antd";

import { UserContext } from "../contexts/UserContext";
import { User } from "../utils";
import "../styles/ProfilePage.css";


const ProfilePage = () => {
    const { user } = useParams<{user: string}>();
    const { currentUser } = useContext(UserContext);

    const [userDetails, setUserDetails] = useState<User>(null);

    useEffect(() => {
        if (user === currentUser.user) {
            setUserDetails(currentUser);
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
        : (
            <Alert type="info" message="Retrieving user..." />
        )
    );
};

export default ProfilePage;