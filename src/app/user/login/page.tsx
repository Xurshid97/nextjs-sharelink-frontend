"use client"
import { Button, Card, Form, Input } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "./Login.css";
import {
    getUserData,
    loginWithAccessToken,
    loginWithoutAccessToken,
} from "../../api/userAPI";
import { getAccessToken, setAccessToken, setStoredCategories } from "../../constants/storage";
import { useRouter } from 'next/navigation';
import { useState } from "react";

interface LoginResponse {
    message: string;
    access_token: string;
    SavedCategories: string;
}

const Login = function () {
    const [message, setMessage] = useState(""); // Add message state
    const navigate = useRouter();

    function saveCategoriesConvert(ans: LoginResponse) {
        const savedCategories: Array<string> = ans.SavedCategories.split(",");
        const savedCategoriesInt: Array<number> = [];
        // convert string to number
        savedCategories.forEach((category: string, index: number) => {
            savedCategoriesInt[index] = Number(category) // Convert number to string
        });
        return savedCategoriesInt
    }

    const handleFormSubmit = async (values: any) => {
        // Get form data and access token
        const { username, password } = values;
        const accessToken = getAccessToken();

        // Check if the form fields are empty
        if (!username || !password) {
            return; // Do not send request if form is empty
        }

        if (accessToken) {
            const ans = await loginWithAccessToken(
                username,
                password,
                accessToken
            );

            // redirect user link if response message is success
            if (ans.message === "User authenticated successfully.") {
                localStorage.setItem("Access token Sharelink", ans.access_token);

                const savedCategories = saveCategoriesConvert(ans)
                setStoredCategories(savedCategories);
                navigate.push("/user");
            } else if (ans.message === "User not found.") {
                // check if access token exists in backend, if it isn't just remove it from local storage
                try {
                    const check_token = await getUserData(accessToken);
                    console.log('message', check_token);
                } catch (error) {
                    localStorage.setItem("Access token Sharelink", "");
                }
            }

            setMessage(ans.message);
            //
        } else {
            const ans = await loginWithoutAccessToken(username, password);
            const savedCategories = saveCategoriesConvert(ans)
            if (ans.message === "User authenticated successfully.") {
                setAccessToken(ans);
                setStoredCategories(savedCategories);
                navigate.push("/user");
            }
            setMessage(ans.message);
        }
    };

    return (
        <Card
            style={{
                maxWidth: "fit-content",
            }}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 5,
                }}
                initialValues={{ remember: true }}
                onFinish={handleFormSubmit} // Add onFinish event handler
            >
                {/* Form fields */}
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}>
                    <Input
                        className="input-component"
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}>
                    <Input
                        className="input-component"
                        type="password"
                        prefix={<KeyOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>

                {/* Submit button */}
                <Button
                    className="button-component"
                    type="primary"
                    htmlType="submit">
                    Submit
                </Button>
            </Form>
            {message && <h3>{message}</h3>}
        </Card>
    );
};

export default Login;
