"use client"
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../constants/urls";
import { userCreateWithUsernameAndPassword } from "../../api/userAPI";
import { getAccessToken, getStoredCategories } from "../../constants/storage";
import "./Register.css";
import { useRouter } from 'next/navigation'
import { useState } from "react";

const RegisterForm = () => {
    const [form] = Form.useForm();
    const navigate = useRouter();
    const access_token = getAccessToken();
    const [imageFile, setImageFile] = useState<File | null>(null); // Image file state
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        const formData = new FormData();
        formData.append("image", imageFile!); // Append image file from state
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("savedcategories", getStoredCategories().toString());
        try {
            if (access_token) {
                let token = await userCreateWithUsernameAndPassword(
                    BASE_URL,
                    access_token,
                    formData
                );
                console.log("token", token.message);
                if (token.message === "the user is already present go to log in") {
                    navigate.push("/user/login");
                }
                else if (token.message === "User saved successfully.") {
                    localStorage.setItem("Access token Sharelink", token.access_token);
                    navigate.push("/user");
                }
            } else {
                const res = await userCreateWithUsernameAndPassword(BASE_URL, "", formData);
                console.log(typeof res.message);

                if (res.message === 'User saved successfully.') {
                    form.resetFields();
                    navigate.push("/user/login");
                }
                else if (res.message === "the user is already present go to log in") {
                    form.resetFields();
                    setImageFile(null); // Reset image file state
                    messageApi.info("User already exists, please login or try with different username.");
                }
            }
        } catch (error) {
            console.log("error", error);
            // Handle error
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    return (
        <Card
            style={{
                width: "fit-content",
            }}>
            {contextHolder}
            <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 5,
                }}>
                <Form.Item name="image">
                    <Input
                        type="file"
                        onChange={handleImageChange} // Handle image change
                    />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                    style={{
                        width: "100%",
                    }}>
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Please input your Email!" },
                    ]}
                    style={{
                        width: "100%",
                    }}>
                    <Input
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        }
                        type="email"
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                    style={{
                        width: "100%",
                    }}>
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{
                            width: "100%",
                        }}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default RegisterForm;
