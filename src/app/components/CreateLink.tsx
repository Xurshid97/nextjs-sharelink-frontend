import { useState, ChangeEvent, FormEvent } from "react";
import { postLink } from "../api/linksAPI";
import { getAccessToken } from "../constants/storage";
import { LINKS_URL } from "../constants/urls";
import { Card, Input, Space } from "antd";
import Meta from "antd/es/card/Meta";
import "./CreateLink.css";

interface Props {
    categoryId: number;
    fetchData: () => void;
}

const { TextArea } = Input;

function CreateLink({ fetchData, categoryId }: Props) {
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        image: null as File | null,
        description: "",
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (name === "image" && files) {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const access_token = getAccessToken();
            if (access_token) {
                const form = new FormData();
                form.append("title", formData.title);
                form.append("url", formData.url);
                form.append("description", formData.description);
                if (formData.image) {
                    form.append("image", formData.image);
                }
                form.append("category", categoryId.toString());
                console.log("form data:", form);

                await postLink(LINKS_URL, form);
                fetchData();
                setFormData({
                    title: "",
                    url: "",
                    image: null,
                    description: "",
                });
            }
        } catch (error) {
            console.error("Error creating link:", error);
        }
    };

    return (
        <div>
            <Card>
                <Meta
                    description={
                        <form onSubmit={handleSubmit}>
                            <Space direction="vertical">
                                <Input
                                    type="file"
                                    name="image"
                                    onChange={handleInputChange}
                                />
                                <Input
                                    type="url"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Url"
                                />
                                <TextArea
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Title"
                                    style={{
                                        fontWeight: "bold",
                                        margin: "5px 0",
                                    }}
                                    autoSize
                                />
                                <TextArea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                    autoSize
                                />
                                <Input
                                    
                                    type="submit"
                                    value="Create Link"
                                    style={{ width: "100%", backgroundColor: "#1890ff", color: "white"}}
                                />
                            </Space>
                        </form>
                    }
                />
            </Card>
        </div>
    );
}

export default CreateLink;
