"use client"
import { useEffect, useState } from "react";
import { getAccessToken } from "../../constants/storage";
import { getLinks } from "../../api/linksAPI";
import { LINKS_URL, changed_img } from "../../constants/urls";
import Link from "next/link";
import {
    Avatar,
    Card,
    Divider,
    Flex,
    List,
    Skeleton,
} from "antd";
import Meta from "antd/es/card/Meta";
import { ShareAltOutlined, ExportOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from './styles.module.css'

interface LinkData {
    id: number;
    title: string;
    url: string;
    image: File | string;
    description: string;
}

function Links({ params }: { params: { categoryId: number } }) {
    const [links, setLinks] = useState<LinkData[]>([]);
    const [loading, setLoading] = useState(false);
    const publicCategoryId = params.categoryId

    const fetchData = async () => {
        setLoading(true);
        try {
            const access_token = getAccessToken();
            if (access_token) {
                const linksData = await getLinks(LINKS_URL, Number(publicCategoryId)); // Convert categoryId to number
                setLinks(linksData.links);
            }
        } catch (error) {
            console.error("Error fetching links:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [publicCategoryId]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}>
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
                    <Flex
                        vertical
                    >
                        <Skeleton
                            avatar
                            paragraph={{ rows: 2 }}
                            active
                        />
                        <br />
                        <Skeleton
                            avatar
                            paragraph={{ rows: 2 }}
                            active
                        />
                    </Flex>
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
                            className={styles.cardsParent}
                            dataSource={links}
                            renderItem={(link) => (
                                <Card
                                    className={styles.cardLinks}
                                    cover={
                                        link.image ? (
                                            <Avatar
                                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                                style={{
                                                    width: "100%",
                                                    border: "none",
                                                    height: "100%", // Ensure the image takes full height
                                                    padding: "5px",
                                                    backgroundColor: "transparent",
                                                }}
                                                icon={
                                                    <img
                                                        src={changed_img + link.image ? changed_img + link.image : "#"}
                                                        alt="Image"
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",  // Ensure the image takes full height
                                                            objectFit: "cover", // This will make sure the image covers the Avatar area without distortion
                                                            borderRadius: "8px",
                                                        }}
                                                    />}
                                            />
                                        ) : (
                                            <ShareAltOutlined />
                                        )
                                    }
                                    key={link.id}>
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
                )
                }
            </div >
        </div >
    );
}

export default Links;
