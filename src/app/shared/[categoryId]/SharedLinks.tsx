"use client";
import { useEffect, useState } from "react";
import { getLinks } from "../../api/linksAPI";
import { LINKS_URL, changed_img } from "../../constants/urls";
import { getStoredCategories, setStoredCategories } from "../../constants/storage";
import Link from "next/link";
import "./SharedLinks.css";
import { Avatar, Card, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Meta from "antd/es/card/Meta";
import { ShareAltOutlined, ExportOutlined } from '@ant-design/icons';
import { saveCategoryListToUser } from "../../api/userAPI";

interface LinkData {
    id: number;
    title: string;
    url: string;
    image: string;
    description: string;
}

function SharedLinks({ params }: { params: { categoryId: number } }) {
    const [links, setLinks] = useState<LinkData[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const categoryId = params.categoryId;

    const fetchData = async () => {
        try {
            if (categoryId) {
                const linksData = await getLinks(LINKS_URL, Number(categoryId)); // Convert categoryId to a number
                setCategoryName(linksData.category_name);
                setLinks(linksData.links);
                await setStoredCategories([Number(categoryId)]);
                const storedCategories = getStoredCategories();
                saveCategoryListToUser(storedCategories);
            }
        } catch (error) {
            console.error("Error fetching links:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    return (
        <div
            id="scrollableDiv"
            style={{
                height: "70vh",
                width: "100%",
                overflow: "auto",
                padding: "0 16px",
                border: "none",
            }}>
            <h4>{categoryName}</h4>
            <InfiniteScroll
                dataLength={links.length}
                next={fetchData}
                hasMore={false} // Assuming hasMore should be false, as there is no logic to determine if more data is available
                loader={
                    <Skeleton
                        avatar
                        paragraph={{ rows: 1 }}
                        active
                    />
                }
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv">
                <List
                    dataSource={links}
                    renderItem={(link) => (
                        <Card
                            className="card-links"

                            key={link.id} // Add key prop here
                            cover={
                                link.image ? (
                                    <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                        style={{
                                            borderRadius: "50%",
                                            marginLeft: "5px"
                                        }}
                                        icon={
                                            <img
                                                src={changed_img + link.image ? changed_img + link.image : "#"}
                                                alt="Image"
                                            />}
                                    />
                                ) : (
                                    <ShareAltOutlined />
                                )
                            }>
                            <div className="link-details">
                                <Card
                                    style={{
                                        border: "none",
                                        width: "100%",
                                    }}>
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
                                                    {
                                                        link.url.split("/")[2] === 't.me' ?
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
        </div>
    );
}

export default SharedLinks;
