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
import { getGlobalCategories } from "../../api/categoriesAPI";
import InfiniteScroll from "react-infinite-scroll-component";
const Text = Typography.Text;

type Category = {
    id: number;
    name: string;
    globalcategory: string,
    isPublic: boolean;
    username: string;
};

interface CategoriesResponse {
    categories: Category[]; // Assuming the API response has this structure
}
function PublicCategoryNames({ params }: { params: { companyName: string } }) {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const companyName = params.companyName.split("%20").join(" ");

    const loadMoreData = async () => {
        setLoading(true);
        try {
            const categoriesData: CategoriesResponse = await getGlobalCategories();
            setCategories(categoriesData.categories);
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
                            renderItem={(category: Category) => {
                                if (category.username === companyName) {
                                    return (
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
                                                    href={`${(category as { username: string }).username}/${(category as { globalcategory: string }).globalcategory}`}>
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
                                    )
                                }
                            }}
                        />
                    </InfiniteScroll>
            }
        </div>
    );
}

export default PublicCategoryNames;
