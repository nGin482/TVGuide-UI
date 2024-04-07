import { useState, useEffect } from "react";
import { Alert, Button, Divider, Form, Input, Space } from "antd";

import { changePassword } from "../requests";
import { CurrentUser } from "../utils";
import "../styles/ProfileSettingsPage.css";

interface SettingsProps {
    user: CurrentUser
};

interface AccountDetailsFormValues {
    username: string
    password: string
};

interface ChangeDetailsResponse {
    submitted: boolean
    result: boolean
    message: string
};

const ProfileSettingsPage = ({ user }: SettingsProps) => {
    const baseChangeDetailsResponse: ChangeDetailsResponse = {
        submitted: false,
        result: false,
        message: ''
    };
    const [changeDetailsResponse, setChangeDetailsResponse] = useState<ChangeDetailsResponse>(baseChangeDetailsResponse);

    const changeDetailsHandle = async (values: AccountDetailsFormValues) => {
        console.log(values)
        const response = await changePassword(user.username, values.password, user.token);
        console.log(response)
        if (response.result === 'success') {
            setChangeDetailsResponse({
                submitted: true,
                result: true,
                message: response.payload.message
            });
        }
        else {
            const message = response.msg
                ? 'You have been signed out. Please sign in again to change your password'
                : response.message;
            setChangeDetailsResponse({
                submitted: true,
                result: false,
                message: message
            });
        }
    };


    return (
        <>
            <h3>{user.username}</h3>
            <Divider />
            <div id="change-details">
                <h5>Change Account Details</h5>
                <Form
                    onFinish={changeDetailsHandle}
                >
                    <Form.Item
                        label="Change Username"
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Change Password"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button htmlType="submit" type="primary">Submit</Button>
                        </Space>
                    </Form.Item>
                </Form>
                {changeDetailsResponse.submitted && (
                    <Alert
                        type={changeDetailsResponse.result ? "success" : "error"}
                        message={changeDetailsResponse.message}
                    />
                )}
            </div>
            {user.role !== 'Admin' && (
                <>
                    <Divider orientation="left">Request Administrator Access</Divider>
                    <div id="admin-access-request-section">
                        <p>
                            Administrators are able to make changes to:
                            <ul>
                                <li>search items</li>
                                <li>reminders</li>
                                <li>details about shows and episodes recorded</li>
                            </ul>
                            A request will need to be approved by another admin in order for administration access to be granted
                        </p>
                        <Button onClick={() => console.log('Requesting admin access')} id="admin-access-request">Request</Button>
                    </div>
                </>
            )}
            <div id="delete-account-section">
                <Divider orientation="left">Delete Account</Divider>
                <p>Please be certain before deleting your account.
                    <br/>
                    NOTE: Any shows or reminders you have requested to be added will not be deleted as these are used for all users.
                </p>
                <Button danger type="primary">Delete Account</Button>
            </div>
        </>
    )
};

export default ProfileSettingsPage;