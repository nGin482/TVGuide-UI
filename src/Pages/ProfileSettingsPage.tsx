import { useState, useEffect } from "react";
import { Button, Divider, Form, Input, Space } from "antd";

import { CurrentUser } from "../utils";
import "../styles/ProfileSettingsPage.css";

interface SettingsProps {
    user: CurrentUser
}

const ProfileSettingsPage = ({ user }: SettingsProps) => {


    return (
        <>
            <h3>{user.username}</h3>
            <Divider />
            <div id="change-details">
                <h5>Change Account Details</h5>
                <Form>
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
                            <Button onClick={() => console.log('cancelling')}>Cancel</Button>
                            <Button onClick={() => console.log('submitted')} type="primary">Submit</Button>
                        </Space>
                    </Form.Item>
                </Form>
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
                <p>Please be certain before deleting your account</p>
                <Button danger type="primary">Delete Account</Button>
            </div>
        </>
    )
};

export default ProfileSettingsPage;