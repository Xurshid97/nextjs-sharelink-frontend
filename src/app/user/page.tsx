"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { Button, Flex, Input, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { BASE_URL, changed_img } from "../constants/urls";
import { deleteUser, getUserData, patchUserData } from "../api/userAPI";
import { getAccessToken } from "../constants/storage";
import { Image } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

interface UserData {
    username: string;
    email: string;
    image: string;
}

function UserPage() {
    const location = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [sendRequest, setSendRequest] = useState(false);

    const editHandler = () => {
        setIsModalOpen(true);
    };

    const [userData, setUserData] = useState<UserData>({
        username: "",
        email: "",
        image: "",
    });

    const handleOk = async () => {
        const accessToken = getAccessToken() || "";
        if (!accessToken) return;

        try {
            const updatedData = new FormData();
            updatedData.append('image', imageFile || '');

            const updatedUserData = await patchUserData(accessToken, updatedData);
            setUserData(updatedUserData);
            setIsModalOpen(false);
            setSendRequest(!sendRequest);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        await deleteUser(BASE_URL, getAccessToken() || "");
        localStorage.setItem("Access token Sharelink", "");
        setUserData({
            username: "",
            email: "",
            image: "",
        });
    };

    useEffect(() => {
        const accessToken = getAccessToken() || "";
        console.log(accessToken, 'unexpected request is here');
        if (accessToken && accessToken !== "") {
            getUserData(accessToken).then((data) => {
                setUserData(data);
            });
        }
    }, [location, sendRequest]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    return (
        <div>
            {children}
            <br />
            {location === "/user/login" && (
                <Link href="user/register">Register</Link>
            )}
            {location === "/user/register" && (
                <Link href="user/login">Login</Link>
            )}
            {location === "/user" && (
                <Flex
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 5,
                    }}>
                    <Image
                        src={
                            userData.image
                                ? changed_img + userData.image
                                : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        }
                        style={{
                            width: 100,
                            borderRadius: 50,
                            objectFit: "cover",
                            border: "1px dashed #000",
                        }}
                    />
                    <h3>{"Welcome! " + userData.username}</h3>
                    <Text>{userData.email}</Text>
                    <br />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: '10px',
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => editHandler()}>
                            Edit
                        </Button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                        }}>
                        <Link href="user/login">Login</Link>
                        <Link href="user/register">Register</Link>
                    </div>
                </Flex>
            )}
            <Modal
                title="Edit User Data"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Space direction="vertical">
                    <Input
                        type="file"
                        placeholder="Browse image"
                        onChange={handleImageChange}
                    />
                </Space>
            </Modal>
        </div>
    );
}

export default UserPage;

