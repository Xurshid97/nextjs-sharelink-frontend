"use client"
import { useState, useEffect } from "react";
import {
    Card,
    Skeleton,
    Typography,
    Divider,
    List,
} from "antd";
import Link from "next/link";
import { getCategories, getGlobalCategories } from "../api/categoriesAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAccessToken } from "../constants/storage";
import { CATEG_URL } from "../constants/urls";
const Text = Typography.Text;

type Category = {
    id: number;
    name: string;
    globalcategory: string,
    isPublic: boolean;
};

function PublicCategories() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const loadMoreData = async () => {
        setLoading(true);
        try {
            const access_token = getAccessToken();
            if (access_token) {
                const categoriesData = await getCategories(CATEG_URL);
                setCategories(categoriesData.categories);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const categoriesData = await getGlobalCategories();
                setCategories(categoriesData.categories);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div
            id="scrollableDiv"
            style={{
                height: "70vh",
                overflow: "auto",
                padding: "0 16px",
            }}>
            {
                loading ?
                    <List
                        dataSource={[1, 2, 3, 4, 5]}
                        renderItem={(num) => (
                            <Card
                                key={num}
                                className="category-card">
                                <br />
                                <Skeleton
                                    loading={loading}
                                    avatar
                                    active>
                                    <Link
                                        href={`${num
                                            }`}>
                                        <Text
                                            style={{
                                                color: "blue",
                                                fontWeight: "bold",
                                            }}>
                                            {num}
                                        </Text>
                                    </Link>
                                </Skeleton>
                            </Card>
                        )}
                    /> :
                    <InfiniteScroll
                        dataLength={categories && categories.length}
                        next={loadMoreData}
                        hasMore={categories.length < 0}
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
                            dataSource={categories}
                            renderItem={(category: Category) => (
                                <Card
                                    key={category.id}
                                    className="category-card"
                                    style={{
                                        marginBottom: "16px",
                                    }}>
                                    {/* <Text
                                style={{
                                    fontWeight: "bold",
                                }}>
                                Created by:{" "}
                                {(category as { username?: string }).username
                                    ? (category as { username?: string })
                                          .username
                                    : "Anonymous"}
                            </Text> */}
                                    <Skeleton
                                        loading={loading}
                                        avatar
                                        active>
                                        <Link
                                            href={`global/${(category as { id: number }).id
                                                }`}>
                                            <Text
                                                style={{
                                                    color: "blue",
                                                    fontWeight: "bold",
                                                }}>
                                                {(category as { name: string }).name}
                                            </Text>
                                        </Link>
                                    </Skeleton>
                                </Card>
                            )}
                        />
                    </InfiniteScroll>
            }
        </div>
    );
}

export default PublicCategories;
