"use client"
import { useEffect, useState } from "react";
import { getAccessToken } from "../../../../constants/storage";
import { getLinks } from "../../../../api/linksAPI";
import { CATEG_URL, LINKS_URL, changed_img } from "../../../../constants/urls";
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
import { getGlobalCategories } from "@/app/api/categoriesAPI";

interface LinkData {
    id: number;
    title: string;
    url: string;
    image: File | string;
    description: string;
    category_name: string;
    name: string;
    links: Array<LinkData>;
}

function Links({ links }: { links: LinkData[] }) {
    const loading = !links.length;
    // const [loading, setLoading] = useState(false);
    // const publicCategory_name = params.category_name.split("%20").join(" ");
    // const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //         const categoriesData = await getGlobalCategories();
    //         categoriesData.categories.forEach((category: LinkData) => {
    //             if (category.name === publicCategory_name) {
    //                 setLinks(category.links);
    //             }
    //         });
    //     } catch (error) {
    //         console.error("Error fetching links:", error);
    //     }
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     fetchData();
    // }, [publicCategory_name]);
    const fetchData = ()=>{}
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
                                                        alt={link.title}
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
                                                        <div
                                                            style={{
                                                                display: "inline-block",
                                                                whiteSpace: "normal",
                                                                wordWrap: "break-word",
                                                            }}
                                                        >
                                                            {link.title}
                                                            <ExportOutlined style={{
                                                                marginLeft: "8px",
                                                            }} />
                                                        </div>

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
