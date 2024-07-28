"use client"
import { useState, useEffect } from "react";
import './SharedCategories.css'
import {
    getStoredCategories,
    setAccessToken,
    setStoredCategories,
} from "../constants/storage";
import { getSharedCategories, postCategory } from "../api/categoriesAPI";
import { AppstoreAddOutlined, DeleteFilled, FastForwardOutlined } from "@ant-design/icons";
import {
    Card,
    Skeleton,
    Divider,
    List,
    Popover,
    Typography,
    message,
} from "antd";
import { CATEG_URL, LINKS_URL } from "../constants/urls";
import InfiniteScroll from "react-infinite-scroll-component";
import { postLink } from "../api/linksAPI";
import Link from "next/link";
// const { Meta } = Card;
const Text = Typography.Text;

interface Category {
    id: string;
    name: string;
    links: [];
}

interface Link {
    category: string;
}

function SharedCategories() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchData = async () => {
        try {
            const storedCategories = getStoredCategories();
            if (storedCategories) {
                setLoading(true);
                const categoriesData = await getSharedCategories(
                    CATEG_URL,
                    storedCategories
                );
                setCategories(categoriesData.categories);
                setLoading(false);
                const arrayOfCategories = [];
                for (const categ of categoriesData.categories) {
                    arrayOfCategories.push(categ.id);
                }
                setStoredCategories(arrayOfCategories);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSaveClick = async (category: Category) => {
        try {
            const ans = await postCategory(CATEG_URL, category);

            if (category.links.length > 0) {
                for (let i = 0; i < category.links.length; i++) {
                    let link: Link = category.links[i];
                    link.category = ans.categories.id;

                    // Convert link object to FormData
                    const formData = new FormData();
                    for (const key in link) {
                        if (link.hasOwnProperty(key)) {
                            formData.append(key, (link as any)[key]);
                        }
                    }

                    await postLink(LINKS_URL, formData);
                }
            }

            setAccessToken(ans);
            messageApi.info("Category saved");
        } catch (error) {
            console.error("Error sharing category:", error);
        }
    };


    const handleRemoveClick = async (id: string) => {
        try {
            const storedCategories = getStoredCategories();
            const newCategories = storedCategories.filter(
                (categ) => categ !== id
            );
            localStorage.setItem(
                "Sharelink Stored categories",
                JSON.stringify(newCategories)
            );
            fetchData();
        } catch (error) {
            console.error("Error removing category:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {contextHolder}
            <div
                id="scrollableDiv"
                style={{
                    height: "70vh",
                    overflow: "auto",
                    padding: "0 16px",
                }}>
                <InfiniteScroll
                    dataLength={categories && categories.length}
                    next={fetchData}
                    hasMore={categories && categories.length < 0}
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
                        dataSource={categories.reverse()}
                        renderItem={(category) => (
                            <Card
                                key={(category as { id: string }).id}
                                style={{
                                    marginBottom: "16px",
                                }}
                                className="category-card"
                                actions={[
                                    <Popover key="save" title="Save to your categories">
                                        <AppstoreAddOutlined
                                            key="saveToMySelf"
                                            onClick={() =>
                                                handleSaveClick(category)
                                            }
                                        />
                                    </Popover>,
                                    <Popover key="delete" title="Remove from shared">
                                        <DeleteFilled
                                            key="remove"
                                            onClick={() =>
                                                handleRemoveClick(
                                                    (category as { id: string })
                                                        .id
                                                )
                                            }
                                        />
                                    </Popover>,
                                ]}>
                                <Skeleton
                                    loading={loading}
                                    avatar
                                    active>
                                    <Link
                                        href={`shared/${(category as { id: string }).id
                                            }`}>
                                        <Text
                                            style={{
                                                color: "blue",
                                                fontWeight: "bold",
                                            }}>
                                            <FastForwardOutlined />
                                            {
                                                (
                                                    category as {
                                                        name: string;
                                                    }
                                                ).name
                                            }
                                        </Text>
                                    </Link>
                                </Skeleton>
                            </Card>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default SharedCategories;
