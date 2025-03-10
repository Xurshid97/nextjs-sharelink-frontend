"use client";
import { useState, useEffect } from "react";
import { getAccessToken } from "../constants/storage";
import {
    deleteCategory,
    getCategories,
    patchCategory,
} from "../api/categoriesAPI";
import {
    DeleteFilled,
    EditFilled,
    ShareAltOutlined,
    LockFilled,
    UnlockFilled,
    FastForwardOutlined
} from "@ant-design/icons";
import {
    Card,
    Skeleton,
    message,
    Popconfirm,
    Modal,
    Input,
    Typography,
    Popover,
    Divider,
    List,
} from "antd";
import CreateCategory from "../components/CreateCategory";
import { CATEG_URL, sharebase } from "../constants/urls";
import Link from "next/link";
import "./Categories.css";
import InfiniteScroll from "react-infinite-scroll-component";

const { TextArea } = Input;
const { Text } = Typography;

type Category = {
    id: number;
    name: string;
    isPublic: boolean;
};

function Categories() {
    const [isPublic, setIsPublic] = useState(true);
    const [condition, setCondition] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const confirm = async (categoryId: number) => {
        await deleteCategory(CATEG_URL, categoryId);
        setCondition(!condition);
    };

    const handleShareClick = async (category: Category) => {
        try {
            if (navigator.share) {
                const categoryLink = `${sharebase}shared/${category.id}`;
                const sharedMessageText = `${category.name}`;

                await navigator.share({
                    title: "Share Category",
                    text: sharedMessageText,
                    url: categoryLink,
                });
                messageApi.info("Shared successfully!");
            } else {
                messageApi.error("Web Share API is not supported in this browser.");
            }
        } catch (error) {
            console.error("Error sharing:", error);
            messageApi.error("Failed to share.");
        }
    };

    const editHandler = (category: Category) => {
        setSelectedCategory({ ...category });
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (selectedCategory) {
            await patchCategory(CATEG_URL, selectedCategory);
            const updatedCategories = categories.map(category =>
                category.id === selectedCategory.id ? selectedCategory : category
            );
            setCategories(updatedCategories);
            setCondition(!condition);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const makePublic = async (category: Category) => {
        setIsPublic(!isPublic);
        await patchCategory(CATEG_URL, {
            ...category,
            isPublic: !category.isPublic,
        });
        messageApi.info(`Link is ${category.isPublic ? "private" : "public"} now`);
    };

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
        loadMoreData();
    }, [condition, isPublic]);

    return (
        <div className="category_main">
            {contextHolder}
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "16px", position: 'relative', zIndex: 100 }}>
                <CreateCategory setCategories={setCategories} />
            </div>
            <div id="scrollableDiv" style={{ maxHeight: "66vh", overflow: "auto", padding: "0 16px", position: 'relative', zIndex: 100 }}>
                {loading ?
                    <List
                        dataSource={[1, 2, 3, 4, 5]}
                        renderItem={(num) => (
                            <Card key={num} className="category-card">
                                <Skeleton loading={loading} avatar active>
                                    <Link href={`${num}`}>
                                        <Text style={{ color: "blue", fontWeight: "bold" }}>
                                            {num}
                                        </Text>
                                    </Link>
                                </Skeleton>
                            </Card>
                        )}
                    /> :
                    <InfiniteScroll
                        dataLength={categories.length}
                        next={loadMoreData}
                        hasMore={categories.length < 0}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv">
                        <List
                            dataSource={categories.reverse()}
                            renderItem={(category: Category) => (
                                <Card
                                    key={category.id || 0}
                                    className="category-card"
                                    style={{ marginBottom: "16px" }}
                                    actions={[
                                        <ShareAltOutlined key="share" onClick={() => handleShareClick(category)} />,
                                        <EditFilled key="edit" onClick={() => editHandler(category)} />,
                                        <Popconfirm
                                            key="delete"
                                            title="Delete the task"
                                            description="Are you sure to delete this category?"
                                            onConfirm={() => confirm(category.id)}
                                            onCancel={handleCancel}
                                            okText="Delete"
                                            cancelText="No">
                                            <DeleteFilled key="delete" />
                                        </Popconfirm>,
                                        <Popover title={category.isPublic ? "public" : "private"} key="visibility">
                                            {category.isPublic ? (
                                                <UnlockFilled onClick={() => makePublic(category)} />
                                            ) : (
                                                <LockFilled onClick={() => makePublic(category)} />
                                            )}
                                        </Popover>,
                                    ]}>
                                    <Skeleton loading={loading} avatar active>
                                        <Link href={`category/links?categoryId=${category.id}`}>
                                            <Text style={{ color: "blue", fontWeight: "bold" }}>
                                                <FastForwardOutlined /> <span>{category.name}</span>
                                            </Text>
                                        </Link>
                                    </Skeleton>
                                </Card>
                            )}
                        />
                        <Modal
                            title="Edit Category"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}>
                            <TextArea
                                style={{ minHeight: "100px" }}
                                value={selectedCategory?.name || ""}
                                onChange={(e) => {
                                    const updatedCategory = {
                                        ...(selectedCategory || {}),
                                        name: e.target.value,
                                    } as Category;
                                    setSelectedCategory(updatedCategory);
                                }}
                            />
                        </Modal>
                    </InfiniteScroll>}
            </div>
        </div>
    );
}

export default Categories;
