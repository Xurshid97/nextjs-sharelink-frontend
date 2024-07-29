"use client"
import "./Links.css";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../constants/storage";
import { deleteLink, getLinks, patchLink } from "../../api/linksAPI";
import { LINKS_URL, changed_img } from "../../constants/urls";
import CreateLink from "../../components/CreateLink";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import {
    Avatar,
    Card,
    Divider,
    FloatButton,
    Input,
    List,
    Modal,
    Skeleton,
    Space,
} from "antd";
import Meta from "antd/es/card/Meta";
import { DeleteFilled, EditOutlined, PlusOutlined, ShareAltOutlined, ExportOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

interface LinkData {
    id: number;
    title: string;
    url: string;
    image: File | string;
    description: string;
}

const { TextArea } = Input;

function Links() {
    const [links, setLinks] = useState<LinkData[]>([]);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams()
    const categoryId = searchParams.get('categoryId')

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState<LinkData | null>(null);
    const [condition, setCondition] = useState(false);

    const editHandler = (link: LinkData) => {
        setSelectedLink(link);
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        const formData = new FormData();
        formData.append("id", selectedLink?.id.toString() || "");
        formData.append("title", selectedLink?.title || "");
        formData.append("url", selectedLink?.url || "");
        formData.append("description", selectedLink?.description || "");

        if (selectedLink?.image && selectedLink.image instanceof File) {
            formData.append("image", selectedLink.image);
        }

        await patchLink(LINKS_URL, formData);
        setCondition(!condition);
        setIsModalOpen(false);
    };

    const deleteHandler = async (id: number) => {
        await deleteLink(LINKS_URL, id);
        setCondition(!condition);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalCreateOpen(false);
    };

    const fetchData = async () => {
        try {
            const access_token = "getAccessToken()";
            if (access_token) {
                setLoading(true);
                const linksData = await getLinks(LINKS_URL, Number(categoryId)); // Convert categoryId to number
                setLinks(linksData.links);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching links:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId, condition]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}>
            <FloatButton
                badge={{ count: links.length }}
                style={{ right: 94, bottom: 60 }}
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setIsModalCreateOpen(true);
                }}
            />
            <br />
            <div
                id="scrollableDiv"
                style={{
                    height: "70vh",
                    width: "100%",
                    overflow: "auto",
                    padding: "0 16px",
                    border: "none",
                }}>
                {loading ? (
                    <Skeleton
                        avatar
                        paragraph={{ rows: 2 }}
                        active
                    />
                ) : (
                    <InfiniteScroll
                        dataLength={links.length}
                        next={fetchData}
                        hasMore={false}
                        loader={
                            <Skeleton
                                avatar
                                paragraph={{ rows: 1 }}
                                active
                            />
                        }
                        endMessage={
                            <Divider plain>It is all, nothing more 🤐</Divider>
                        }
                        scrollableTarget="scrollableDiv">
                        <List
                            dataSource={links}
                            renderItem={(link) => (
                                <Card
                                    className="card-links"
                                    style={{
                                        marginBottom: "16px",
                                    }}
                                    key={link.id}
                                    cover={
                                        link.image ? (
                                            <Avatar
                                                style={{
                                                    borderRadius: "50%",
                                                    marginLeft: "5px"
                                                }}
                                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                                icon={
                                                    <img
                                                        src={changed_img + link.image ? changed_img + link.image : "#"}
                                                        alt="Image"

                                                    />}
                                            />
                                        ) : (
                                            <ShareAltOutlined style={{
                                                marginLeft: "5px",
                                            }} />
                                        )
                                    }>
                                    <div className="link-details">
                                        <Card
                                            style={{
                                                border: "none",
                                                width: "100%",
                                            }}
                                            actions={[
                                                <DeleteFilled
                                                    key="setting"
                                                    onClick={() =>
                                                        deleteHandler(link.id)
                                                    }
                                                />,
                                                <EditOutlined
                                                    key="edit"
                                                    onClick={() =>
                                                        editHandler(link)
                                                    }
                                                />,
                                            ]}>
                                            <Meta
                                                title={
                                                    <Link
                                                        href={`${link.url}`}
                                                        target={"_blank"}
                                                        rel="noopener noreferrer">
                                                        {link.title}
                                                        <ExportOutlined style={{
                                                            marginLeft: "8px",
                                                        }} />
                                                        <p
                                                            style={{
                                                                fontSize: "12px",
                                                                color: "gray",
                                                                marginTop: "1px",
                                                                marginBottom: "1px",
                                                            }}>
                                                            {link.url.split("/")[2] === 't.me' ?
                                                                link.url.split("//")[1] :
                                                                link.url.split("//")[0] + "//" + link.url.split("/")[2]
                                                            }
                                                        </p>
                                                    </Link>
                                                }
                                                description={link.description}
                                            />
                                        </Card>
                                    </div>
                                </Card>
                            )}
                        />
                    </InfiniteScroll>
                )}
            </div>

            <Modal
                title={
                    <CreateLink
                        fetchData={fetchData}
                        categoryId={Number(categoryId) ?? 0}
                    />
                }
                open={isModalCreateOpen}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: "none" } }}></Modal>

            <Modal
                title={
                    <Space style={{ display: "flex", flexDirection: "column" }}>
                        <Input
                            type="file"
                            name="image"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setSelectedLink((prevState) => ({
                                        ...prevState!,
                                        image: file,
                                    }));
                                }
                            }}
                        />
                        <Input
                            value={selectedLink?.title || ""}
                            style={{ width: "100%" }}
                            onChange={(e) =>
                                setSelectedLink((prevState) => ({
                                    ...prevState!,
                                    title: e.target.value,
                                }))
                            }
                        />
                        <Input
                            style={{ width: "100%" }}
                            value={selectedLink?.url || ""}
                            onChange={(e) =>
                                setSelectedLink((prevState) => ({
                                    ...prevState!,
                                    url: e.target.value,
                                }))
                            }
                        />
                        <TextArea
                            value={selectedLink?.description || ""}
                            onChange={(e) =>
                                setSelectedLink((prevState) => ({
                                    ...prevState!,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </Space>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}></Modal>
        </div>
    );
}

export default Links;
